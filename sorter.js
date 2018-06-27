function SorterUp(list, kind) {
    switch (kind) {
        case 'date': case 'd':
        return list.sort((a, b) =>  a.date < b.date );

        case 'note length': case 'nlength': case 'nl':
        return list.sort((a, b) =>  a.body.toString().length < b.body.toString().length);

        case 'title length': case 'tlength': case 'tl':
        return list.sort((a, b) =>  a.title.toString().length < b.title.toString().length);

        case 'title alphabet': case 'talph': case 'ta':
        return list.sort((a, b)=> a.title.toString() < b.title.toString());
    }
}

function SorterDown(list, kind) {
    switch (kind) {
        case 'date': case 'd':
        return list.sort((a, b) => a.date > b.date );

        case 'note length': case 'nlength': case 'nl':
        return list.sort((a, b) => a.body.toString().length > b.body.toString().length);

        case 'title length': case 'tlength': case 'tl':
        return list.sort((a, b) => a.title.toString().length > b.title.toString().length);

        case 'title alphabet': case 'talph': case 'ta':
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
        default:
            return list;
        break;
    }
}
exports.sort = sort;