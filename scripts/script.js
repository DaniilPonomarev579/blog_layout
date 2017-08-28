var headerHeight;
var textHeight;
var header;
var text;
var firstClick = true;

function determineChildren(note) {
    'use strict';

    for (var child of note.children) {
        var className = child.className;
        if (className.indexOf('note__header') >= 0) {
            header = child;
        }
        if (className.indexOf('note__text') >= 0) {
            text = child;
        }
    }
}

function countNoteHeight(note) {
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

    if (headerHeight >= textHeight) {
        text.style.paddingTop =
            (headerHeight -
            (+getComputedStyle(text)
                .height
                .toString()
                .slice(0, getComputedStyle(text).height.toString().indexOf('p')))) / 2 + 'px';
        text.style.paddingBottom =
            (headerHeight -
            (+getComputedStyle(text)
                .height
                .toString()
                .slice(0, getComputedStyle(text).height.toString().indexOf('p')))) / 2 + 'px';
    }
}

function clickNote() {
    'use strict';

    determineChildren(this);

    if (firstClick) {
        header.style.display = "inline-block";
        console.log(1);

    }
    else {
        header.style.display = "none";
        console.log(2);
    }

    countNoteHeight(this);

    if (firstClick) {
        firstClick = false;

        header.style.opacity = 1;
        this.parentNode.style.height = headerHeight + "px";
        this.style.height = headerHeight + "px";
        changeNoteHeight(this);
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

    var notes = document.querySelectorAll('.note--nav');

    for (var note of notes) {
        note.addEventListener('click', clickNote);
    }
}

addEventListeners();