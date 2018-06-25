const fs = require('fs');

const showAllNotes = (fileName) => {
    console.log(JSON.parse(fs.readFileSync(fileName)));//read and show notes
}

showAllNotes('notes.json');