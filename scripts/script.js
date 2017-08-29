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
            let className = child.className;

            if (className.indexOf('note__header') >= 0) {
                header = child;
            }

            if (className.indexOf('note__text') >= 0) {
                text = child;
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

    function clickNote() {
        if (!currentElement) {
            console.log('!currentElement');
            currentElement = this;
            determineChildren(this);
            // header.style.display = "inline-block";
            header.style.opacity = 1;
            header.style.height = "auto";
            countNoteHeight();
            changeNoteHeightForTablet(this);
        } else {
            console.log('else');
            determineChildren(currentElement);
            header.style.opacity = 0;
            header.style.height = "0";
            // header.style.display = "none";
            currentElement.parentNode.style.height = "0";
            currentElement.style.height = "0";
            if (this !== currentElement) {
                console.log(this + ' ' + currentElement);
                currentElement = null;
                this.click();
            }
            // currentElement = null;
        }
    }

    function clickTags() {
        let tags = this;

        console.log(this.clientWidth);
        if (!currentElement) {
            currentElement = this;
            tags.style.height = "auto";
            tags.style.padding = "40px 3% 30px";
            tags.style.height = getComputedStyle(tags).height;
            tags.parentNode.style.height = +getComputedStyle(tags).height.toString().slice(0, -2) + 100 + "px";
        } else {
            currentElement = null;
            tags.style.height = "0";
            tags.parentNode.style.height = "0";
            setTimeout(function () {
                tags.style.padding = "0";
            }, 500);
        }
    }

    function addEventListeners() {
        let notes = document.querySelectorAll('.note--nav');

        for (let note of notes) {
            note.addEventListener('click', clickNote);
        }

        document.querySelector('.tags--mobile').addEventListener('click', clickTags);
    }

    addEventListeners();
})();