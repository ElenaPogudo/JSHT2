const notes = require('./notesFunctions.js')
const argv = require('yargs')

    .demandCommand()
    .command('add', 'Add new note to the notes list', function (yargs) {
        yargs
            .example('$0 add --t "title" --b "body"')
            .demandOption(['t', 'b'])
    })
    .command('list', 'List all the notea of the notes list', function (yargs) {
        yargs
            .example('$0 list')
    })
    .command('read', 'Read note by title', function (yargs) {
        yargs
            .example('$0 read --t "title"')
            .demandOption(['t'])
    })
    .command('remove', 'Remove note by title', function (yargs) {
        yargs
            .example('$0 remove --t "title"')
            .demandOption(['t'])
    })
    .command('writetoexcel', 'Change note by title', function (yargs) {
        yargs
            .example('$0 writetoexcel')
    })
    // .command('readfromexcel', 'Change note by title', function (yargs) {
    //     yargs
    //         .example('$0 readfromexcel')
    // })
    .command('sort', 'sort list of notes', (yargs) => {
        yargs.options('k', {demand: false, desc: 'Kind of sort', default: 'ta'});
        yargs.options('o', {
            demand: false,
            desc: 'Options of sort.\nValid options: descending(default) or ascending',
            default: 'descending'
        });
    })
    .alias('t', 'title')
    .alias('b', 'body')
    .argv;


function main() {
    const operation = argv._[0];

    const title = argv.title;
    const body = argv.body;
    const kindOfSort = argv.kind;
    const optionsOfSort = argv.options;
    const date = new Date();
    switch (operation) {
        case 'add':
            const newNote = {
                'title': title,
                'body': body,
                'date': `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
            }
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
            console.log(notes.sort(kindOfSort, optionsOfSort));
            break;
        case 'writetoexcel':
            console.log(notes.writetoexcel());
            break;
        // case 'readfromexcel':
        //     console.log(notes.readfromexcel());
        //     break;
        default:
            console.log(`Only the next commands can be used: [add, list, read, remove]`);
    }
}

main();