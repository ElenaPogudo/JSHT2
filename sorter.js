'use strict';
function SorterDown(list, kind) {
    switch (kind) {
        case 'date':
        return list.sort((a, b) =>  a.date < b.date );

        case 'notelength':
        return list.sort((a, b) =>  a.body.toString().length < b.body.toString().length);

        case 'titlelength':
        return list.sort((a, b) =>  a.title.toString().length < b.title.toString().length);

        case 'title':
        return list.sort((a, b)=> a.title.toString() < b.title.toString());
    }
}

function SorterUp(list, kind) {
    switch (kind) {
        case 'date':
        return list.sort((a, b) => a.date > b.date );

        case 'notelength':
        return list.sort((a, b) => a.body.toString().length > b.body.toString().length);

        case 'titlelength':
        return list.sort((a, b) => a.title.toString().length > b.title.toString().length);

        case 'title':
        return list.sort((a, b)=>a.title.toString() > b.title.toString());
    }
}

function sort(list, kind, arg) {
    switch (arg) {
        case 'descending':
        return SorterUp(list, kind);
        break;
        case 'ascending':
        return SorterDown(list, kind);
        break;
    }
}

exports.sort = sort;