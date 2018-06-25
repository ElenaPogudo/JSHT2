const fs=require('fs');
const operationName=process.argv[2];


switch(operationName){
    case 'add':
        require('./Add.js');
        break;
    case 'list':
        require('./List.js');
        break;
    case 'read':
        require('./Read.js');
        break;
    case 'remove':
        require('./Remove.js');
        break;
    default:
        console.log('Sorry, I am not sure what does ' + operationName + ' means.\nPlease use one of theese commands:\n1. add - for adding note;\n2. list - to list all notes;\n3. read + name - for reading one note by its name;\n4. remote + name - for removing note by its name;');
}