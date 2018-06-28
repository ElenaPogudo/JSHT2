'use strict';
const notes = require('./notesFunctions.js')
const argv = require('yargs')

    .demandCommand()
    .command('add', 'Add new note to the notes list', (yargs) => {
        yargs
        yargs.options('title', { demand: true, desc: 'Title of a new note' });
        yargs.options('body', { demand: true, desc: 'Body of a note' });
    })
    .command('list', 'List all the notea of the notes list', (yargs) => {
        yargs
            .example('$0 list')
    })
    .command('read', 'Read note by title', (yargs) => {
        yargs
        yargs.options('title', { demand: true, desc: 'Title of a note you want to see' });
    })
    .command('remove', 'Remove note by title',(yargs) => {
        yargs
        yargs.options('title', { demand: true, desc: 'Title of removing a note' });
    })
    .command('sort', 'Sort notes', (yargs) => {
        yargs.options('kind', {demand: false, desc: 'Sort by', default: 'title'});
        yargs.options('option', {demand: false, desc: 'descending! or ascending', default: 'descending'})
            .example('$0 sort --k "kind" --o "option"')
    })
    .command('writeToExcel', 'Change note by title', (yargs) => {
        yargs
        yargs.options('path', {demand: false, desc: 'Path of excel file', default: './resources/Excel.xlsx'})
    })
    .command('readFromExcel', 'Change note by title', function (yargs) {
        yargs
        yargs.options('path', {demand: false, desc: 'Path of excel file', default: './resources/Excel.xlsx'})
        yargs.options('kind', {demand: false, desc: 'Rewrite or add', default: 'add'})
    })
    .command('fau', 'Found and update notes', (yargs) => {
        yargs.options('title', { demand: true, desc: 'Title of a note' });
        yargs.options('newTitle', { demand: false, desc: 'New title of a note' });
        yargs.options('body', { demand: true, desc: 'Body of a note' })
    })

    .argv;


function main() {
    const operation = argv._[0];

    const title = argv.title;
    const body = argv.body;
    const newTitle = argv.newTitle;
    const kindOfSort = argv.kind;
    const pathToExcel = argv.path;
    const optionOfSort = argv.option;
    const date = new Date();

    switch (operation) {
        case 'add':
            const newNote = {
                'title': title,
                'body': body,
                'date': `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            };
            console.log(notes.add(newNote));
            break;
        case 'list':
            console.log(notes.list());
            break;
        case 'read':
            console.log(notes.read(title));
            break;
        case 'remove':
            console.log(notes.remove(title));
            break;
        case 'sort':
            console.log(notes.sort(kindOfSort, optionOfSort));
            break;
        case 'writeToExcel':
            console.log(notes.writeToExcel(pathToExcel));
            break;
        case 'readFromExcel':
            console.log(notes.readFromExcel(kindOfSort, pathToExcel));
            break;
        case 'fau':
            const chNote = {
                'title': title,
                'body': body,
                'date': `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            };
            console.log(notes.fau(chNote, newTitle));
            break;
        default:
            console.log(`Only this commands allowed: add, list, read, remove, sort, writetoexcel, readfromexcel, fau`);
    }
}

main();