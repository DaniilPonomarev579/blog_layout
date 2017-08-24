var headerHeight;
var textHeight;
var header;
var text;

function countNoteHeight(note) {
    'use strict';

    for (var child of note.children) {
        var className = child.className;

        if (className.indexOf('note__header') >= 0) {
            header = child;
            headerHeight =
                +getComputedStyle(header)
                    .width
                    .toString()
                    .slice(0, getComputedStyle(header).width.toString().indexOf('p'));
            headerHeight +=
                +getComputedStyle(header)
                    .paddingLeft
                    .toString()
                    .slice(0, getComputedStyle(header).paddingLeft.toString().indexOf('p'));
            headerHeight +=
                +getComputedStyle(header)
                    .paddingRight
                    .toString()
                    .slice(0, getComputedStyle(header).paddingRight.toString().indexOf('p'));
        }

        if (className.indexOf('note__text') >= 0) {
            text = child;
            textHeight =
                +getComputedStyle(text)
                    .height
                    .toString()
                    .slice(0, getComputedStyle(text).height.toString().indexOf('p'));
            textHeight +=
                +getComputedStyle(text)
                    .paddingTop
                    .toString()
                    .slice(0, getComputedStyle(text).paddingTop.toString().indexOf('p'));
            textHeight +=
                +getComputedStyle(text)
                    .paddingBottom
                    .toString()
                    .slice(0, getComputedStyle(text).paddingBottom.toString().indexOf('p'));
        }
    }

    console.log(headerHeight + ' ' + textHeight);
}

function changeNoteHeight() {
    'use strict';

    countNoteHeight(this);

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

function addEventListeners() {
    'use strict';

    var notes = document.querySelectorAll('.note--nav');

    for (var note of notes) {
        note.addEventListener('mouseover', changeNoteHeight);
    }
}

addEventListeners();