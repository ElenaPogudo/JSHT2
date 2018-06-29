'use strict';
const notes = require('./notesFunctions.js');
const moment = require('moment');
const fs = require('fs');
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
    let result = '';



    switch (operation) {
        case 'add':
            const newNote = {
                'title': title,
                'body': body,
                'date': moment(date).format('DD/MM/YYYY HH:MM:SS')
            };
            result = notes.add(newNote);
            console.log(result);
            break;
        case 'list':
            result = notes.list()
            console.log(result);
            break;
        case 'read':
            result = notes.read(title)
            console.log(result);
            break;
        case 'remove':
            result = notes.remove(title)
            console.log(result);
            break;
        case 'sort':
            result = notes.sort(kindOfSort, optionOfSort)
            console.log(result);
            break;
        case 'writeToExcel':
            result = notes.writeToExcel(pathToExcel)
            console.log(result);
            break;
        case 'readFromExcel':
            result = notes.readFromExcel(kindOfSort, pathToExcel)
            console.log(result);
            break;
        case 'fau':
            const chNote = {
                'title': title,
                'body': body,
                'date': `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            };
            result = notes.fau(chNote, newTitle)
            console.log(result);
            break;
        default:
            console.log(`Only this commands allowed: add, list, read, remove, sort, writetoexcel, readfromexcel, fau`);
    }
}

main();