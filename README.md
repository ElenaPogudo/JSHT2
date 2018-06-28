Todo app
***
Open in folder with index.js file
***
functions:
1. add - add new note by name and note
            parameters: required:
                               title - name of note
                               body - the note itself
2. list - show all notes
            no parameters required
3. read - show note by name
            parameters: required:
                                title - name of reading note
4. remove - remove note by name
            parameters: required:
                                title - name of delete note
5. sort - sorting notes
             parameters: non required:
                                kind - possible cases: date - sorting by date
                                                       notelength - sorting by length of note body
                                                       titlelength - sorting by title of note
                                                       title(default) - sorting in title alphabet
                                option - possible cases: descending(default) - from min to max
                                                         ascending - from max to min
6. writetoexcel - writing notes to excel file
             parameters: non required:
                                path - path to excel file
7. readfromexcel - reading notes from excel file
             parameters: non required:
                                path - path to excel file
                                kind - possible cases: add(default) - add not repetitive notes
                                                       rewrite - rewrite notes from excel file
8. fau - found and update note by name
             parameters: required:
                                title - title of note you want to change
                                body - new body for this note
                         non required:
                                newTitle - if need to change title