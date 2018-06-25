const fs = require('fs');

const addNote = (fileName) => {
    let i = 0;
    fs.readFile(fileName, 'utf-8', function (err, data) {
            if (err) throw err

            const allNotes = JSON.parse(data)

            allNotes.forEach(function (item) {   //check for repeating names
                if (item.title !== process.argv[3]) {
                    i++;
                }
            })

            if (i < allNotes.length) {       //if found note wih the same name
                console.log('There already exist note with that name, try again with another name')
            }
            else {//else make push to arr

                allNotes.push({
                    title: process.argv[3],
                    body: process.argv[4]
                })


                fs.writeFile(fileName, JSON.stringify(allNotes, '', 4), 'utf-8', function (err) {
                    if (err) throw err;
                })

                console.log('Note was added, you can see all notes by command "list"');// condrats
            }
        }
    )
}
addNote('notes.json');//call function
