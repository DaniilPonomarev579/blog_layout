let headerHeight;
let textHeight;
let header;
let text;
let firstClick = true;

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
    'use strict';

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

    // console.log(headerHeight + ' ' + textHeight);
}

function changeNoteHeight(note) {
    'use strict';

    let difference;

    note.parentNode.style.height = headerHeight + "px";
    note.style.height = headerHeight + "px";

    if (headerHeight > textHeight) {
        // console.log(headerHeight + ' ' + textHeight + ' 1');

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
    'use strict';

    determineChildren(this);

    if (firstClick) {
        header.style.display = "inline-block";

    }
    else {
        header.style.display = "none";
    }

    countNoteHeight();

    if (firstClick) {
        firstClick = false;

        header.style.opacity = 1;
        changeNoteHeight(this);

        // console.log(headerHeight + ' ' + textHeight);
    }
    else {
        firstClick = true;

        header.style.opacity = 0;
        this.parentNode.style.height = "0";
        this.style.height = "0";
    }
}

function addEventListeners() {
    'use strict';

    const notes = document.querySelectorAll('.note--nav');

    for (let note of notes) {
        note.addEventListener('click', clickNote);
    }
}

addEventListeners();