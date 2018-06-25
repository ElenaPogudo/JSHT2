const fs = require('fs');

const showOneNote = (fileName) => {
    let i = 0;
    if(process.argv[3]===undefined){
        console.log('You need to input some existing note name')
    }
    else{
    fs.readFile(fileName, 'utf-8', function (err, data) {//read all notes
        if (err) throw err

        const allNotes = JSON.parse(data);

        allNotes.forEach(function (item) {
            if (item.title === process.argv[3]) {// when found one we need
                console.log(item);//show it
            }
            else i++;
        })

        if (i === allNotes.length) {// if we never found note with that name
            console.log('Note with name [' + process.argv[3] + '] was not found, please try again with another name');
        }
    })}
}

showOneNote('notes.json');