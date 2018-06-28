'use strict';
const xl = require('excel4node');
const XLSX = require('xlsx');
const rw = require('./ReadWrite');
const sorter = require('./sorter.js');

const pathToNotesFile = './resources/notes.json';
const notesList = require(pathToNotesFile);

function addNote(newNote) {
    const note = notesList.find(el => el.title === newNote.title);
    if (note === undefined) {
        notesList.push(newNote);
        rw.writer(JSON.stringify(notesList, null, 2));
        return `The note with title [${newNote.title}] was ADDED successfully to the notes list`;
    }
    return `The note with title [${newNote.title}] is already in the notes list. You can add notes only with unique titles.`;
}

function listAllNotes() {
    return (notesList.length > 0) ? notesList : 'The notes list is empty.';
}

function readNote(title) {
    const note = notesList.find(el => el.title === title);
    const result = (note !== undefined) ? note : `There is no note with title [${title}] in the notes list`;
    return result;
}

function removeNote(title) {
    const index = notesList.findIndex(el => el.title == title);
    if (index > -1) {
        notesList.splice(index, 1);
        rw.writer(JSON.stringify(notesList, null, 2));
        return `The note with title [${title}] has been DELETED SUCCESSFULLY`;
    } else {
        return `There is no note with title [${title}] in the notes list`;
    }
}

function sortNotes(kind, arg) {
    if (notesList.length === 0) {
        return `The list is empty.`
    } else {
        const sortedList = JSON.stringify(sorter.sort(notesList, kind, arg), null, 2);
        rw.writer(sortedList);
        return `Sorted notes: ${sortedList}`;
    }
}

function writeToExcel(pathToExcel) {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet1');
    ws.cell(1, 1).string('title');
    ws.cell(1, 2).string('body');
    ws.cell(1, 3).string('date');
    notesList.forEach(function (element, i) {
        ws.cell(i + 2, 1).string(element.title.toString());
        ws.cell(i + 2, 2).string(element.body.toString());
        ws.cell(i + 2, 3).string(element.date);
        wb.write(pathToExcel);
    });

    return 'Your notes was SUCCESSFULLY WRITE to excel file';
}

function readFromExcel(kind, pathToExcel) {
    const workbook = XLSX.readFile(pathToExcel);
    const sheet_name_list = workbook.SheetNames;
switch (kind){
    case 'add':
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).forEach(function (element) {
            let note = notesList.find(el => el.title === element.title);
            if(note===undefined){notesList.push(element)}});
        rw.writer(JSON.stringify(notesList , null, 2));
        break;
    case 'rewrite':
        const newNotes=[];
        XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]).forEach(function (element) {
            newNotes.push(element)});
        rw.writer(JSON.stringify(newNotes , null, 2));
        break;
}
    return 'Your notes was SUCCESSFULLY READ from excel file';
}

function updateNote(chNote, newTitle) {
    const note = notesList.find(element => element.title === chNote.title);
    if (note === undefined) {
        notesList.push(chNote);
        rw.writer(JSON.stringify(notesList, null, 2));
        return `The new note with title [${chNote.title}] has been ADDED SUCCESSFULLY to the notes list`;
    }
    if (newTitle !== undefined) {
        note.title = newTitle;
    }
    note.date = chNote.date;
    note.body = chNote.body;
    rw.writer(JSON.stringify(notesList, null, 2));
    return `The note with title [${chNote.title}] was SUCCESSFULLY UPDATED`;

}

const notes = {
    add: (note) => {
        return addNote(note);
    },
    list: () => {
        return listAllNotes();
    },
    read: (title) => {
        return readNote(title);
    },
    remove: (title) => {
        return removeNote(title);
    },
    sort: (kind, arg) => {
        return sortNotes(kind, arg)
    },
    writeToExcel: (path) => {
        return writeToExcel(path)
    },
    readFromExcel: (kind, pathToExcel) => {
        return readFromExcel(kind, pathToExcel)
    },
    fau: (note, newTitle) => {
        return updateNote(note, newTitle)
    }
};

module.exports = notes;