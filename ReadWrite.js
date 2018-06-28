const fs = require('fs');
const pathToNotesFile = './resources/notes.json';


function reader() {
    try {
        return JSON.parse(fs.readFileSync(pathToNotesFile, 'utf8'));
    } catch (error) {
        return error;
    }
}

function writer(data) {
    try {
        fs.writeFileSync(pathToNotesFile, data, 'utf8');
        return true;
    } catch (error) {
        return error;
    }
}

function adder(data) {
    try {
        fs.appendFileSync(pathToNotesFile, data, 'utf8');
        return true;
    } catch (error) {
        return error;
    }
}
exports.reader = reader;
exports.writer = writer;
exports.adder = adder;