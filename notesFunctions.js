const fs = require('fs');
const xl = require('excel4node');
const rw= require('./ReadWrite');
const sorter = require('./sorter.js');

const pathToNotesFile = './resources/notes.json';
const notesList = require(pathToNotesFile);

function addNote(newNote) {
    const note = notesList.find(el => el.title === newNote.title);
    if (note === undefined) {
        notesList.push(newNote);
        rw.writer(JSON.stringify(notesList, null, 2));
        return `The note with title [${newNote.title}] has been added successfully to the notes list`;
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
        return `The note with title [${title}] has been deleted successfully`;
    } else {
        return `There is no note with title [${title}] in the notes list`;
    }
}

function sortNotes(kind, arg) {
    if (notesList.length === 0) {
        return `The list is empty.`
    } else {
        //const sortedList=JSON.stringify(sorter.sort(notesList, kind, arg), null, 2);
        rw.writer(JSON.stringify(sorter.sort(notesList, kind, arg), null, 2));
        return `Sorted notes: ${JSON.stringify(sorter.sort(notesList, kind, arg), null, 2)}`;
    }
}


function writeToExcel() {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('Sheet1');

    notesList.forEach(function (element, i) {
        ws.cell(i+1, 1).string(element.title.toString());
        ws.cell(i+1, 2).string(element.body.toString());
        ws.cell(i+1, 3).string(element.date);
        wb.write('./resources/Excel.xlsx');
    })

    return 'Your notes was successfully write to excel file';
}

// function readFromExcel() {
//     const wb = xl.Workbook();
//     wb.write('Excel.xlsx', function () {
//             console.log(xl.getExcelRowCol('B2'));
//     });
//     return 'Your notes was successfully reads from excel file';
// }

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
    writetoexcel: () => {
        return writeToExcel()
    },
    // readfromexcel: () => {
    //     return readFromExcel()
    // }
};

module.exports = notes;