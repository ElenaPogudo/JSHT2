const fs = require('fs');

const deleteOneNote = (fileName) => {
    let i = 0;
    if(process.argv[3]===undefined){
        console.log('You need to input some existing note name, I cant delete note without its name')
    }
    else{
    fs.readFile(fileName, 'utf-8', function (err, data) {
        if (err) throw err

        const allNotes = JSON.parse(data);

        allNotes.forEach(function (item, i) {
            if (item.title === process.argv[3]) {// when found note with right name
                allNotes.splice(i, 1);//deleting it
            }
            else i++;
        })

        if (i === allNotes.length) {
            if (i == 0) {
                console.log('No more notes left');//when last element been deleting
            }
            else
                console.log('Note with name [' + process.argv[3] + '] was not found, please try again with another name');
        }
        fs.writeFile(fileName, JSON.stringify(allNotes, '', 4), 'utf-8', function (err) {
            if (err) throw err;
        })
    })}
}

deleteOneNote('notes.json');