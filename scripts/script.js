(function headerEventListeners() {
    'use strict';

    let headerHeight;
    let textHeight;
    let header;
    let text;
    let firstClick = true;
    let currentElement = null;

    function determineChildren(note) {
        'use strict';

        for (let child of note.children) {
            if (child.tagName !== 'svg') {
                let className = child.className;

                if (className.indexOf('note__header--tablet') >= 0) {
                    header = child;
                }

                if (className.indexOf('note__text') >= 0) {
                    text = child;
                }
            }
        }
    }

    function countNoteHeight() {
        headerHeight = +getComputedStyle(header)
            .width
            .toString()
            .slice(0, getComputedStyle(header).width.toString().indexOf('p'));
        headerHeight += +getComputedStyle(header)
            .paddingLeft
            .toString()
            .slice(0, getComputedStyle(header).paddingLeft.toString().indexOf('p'));
        headerHeight += +getComputedStyle(header)
            .paddingRight
            .toString()
            .slice(0, getComputedStyle(header).paddingRight.toString().indexOf('p'));

        textHeight = +getComputedStyle(text)
            .height
            .toString()
            .slice(0, getComputedStyle(text).height.toString().indexOf('p'));
        textHeight += +getComputedStyle(text)
            .paddingTop
            .toString()
            .slice(0, getComputedStyle(text).paddingTop.toString().indexOf('p'));
        textHeight += +getComputedStyle(text)
            .paddingBottom
            .toString()
            .slice(0, getComputedStyle(text).paddingBottom.toString().indexOf('p'));
    }

    function changeNoteHeightForTablet(note) {
        let difference;

        note.parentNode.style.height = headerHeight + "px";
        note.style.height = headerHeight + "px";

        if (headerHeight > textHeight) {
            difference = (headerHeight -
                          (+getComputedStyle(text)
                              .height
                              .toString()
                              .slice(0, -2))) / 2 + 'px';
            text.style.paddingTop = difference;

            text.style.paddingBottom = difference;
        }

        if (headerHeight < textHeight - 2) {
            note.parentNode.style.height = textHeight + "px";
            note.style.height = textHeight + "px";
        }
    }

    function changeHeightForMobile(element, elementSymbol) {
        let tmpElement = currentElement;

        if (!currentElement) {
            currentElement = element;
            element.style.height = "auto";
            if (element.className.indexOf('tags') >= 0) {
                element.parentNode.style.height = +getComputedStyle(element).height.toString().slice(0, -2) + 50 + "px";
            } else {
                element.parentNode.style.height = +getComputedStyle(element).height.toString().slice(0, -2) + 20 + "px";
            }
            element.style.height = getComputedStyle(element).height;
        } else {
            currentElement.style.height = "0";
            currentElement.parentNode.style.height = "0";
            currentElement = null;
            if (element !== tmpElement) {
                elementSymbol.click();
            }
        }
    }

    function clickNoteSymbol() {
        if (document.body.clientWidth > 650) {
            let note = this.parentNode;
            let tmpNote = currentElement;

            if (!currentElement) {
                currentElement = note;
                determineChildren(note);
                header.style.opacity = 1;
                header.style.height = "auto";
                header.style.height = getComputedStyle(header).height;
                countNoteHeight();
                changeNoteHeightForTablet(note);
            } else {
                determineChildren(currentElement);
                header.style.opacity = 0;
                header.style.height = "0";
                currentElement.parentNode.style.height = "0";
                currentElement.style.height = "0";
                currentElement = null;
                if (note !== tmpNote) {
                    this.click();
                }
            }
        } else {
            changeHeightForMobile(this.parentNode, this);
        }
    }

    function clickTags() {
        changeHeightForMobile(this.parentNode, this);
    }

    function addEventListeners() {
        let noteSymbols = document.querySelectorAll('.note__symbol');
        let noteIcons = document.querySelectorAll('.note__icon-arrow');

        for (let note of noteSymbols) {
            note.addEventListener('click', clickNoteSymbol);
        }

        for (let icon of noteIcons) {
            icon.addEventListener('click', clickNoteSymbol);
        }

        document.querySelector('.tags__symbol').addEventListener('click', clickTags);
        document.querySelector('.tags__icon-arrow').addEventListener('click', clickNoteSymbol);
    }

    addEventListeners();
})();