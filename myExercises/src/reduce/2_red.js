// W pliku books.js znajduje się tablica książek. Posegreguj podane książki względem gatunku. Jeśli książka posiada więcej gatunków niż jeden, powinna znaleźć się pod każdym z tych gatunków. Dodatkowo usuń wszystkie pola oprócz tytułu i autora. Użyj wyłącznie funkcji wbudowanych, for zdecydowanie odpada.

// const books = require('./books.js').booksArray;

// const result = books.reduce(
//   // Uzupełnij
// )

// console.dir(result, { depth: null });

// // Oczekiwany output
// {
//   'fantasy': [
//     { title: 'Lord of the Rings', author: 'J.R.R. Tolkien' },
//     { title: 'Harry Potter', author: 'J.K. Rowling' },
//     // ...
//   ],
//   'fiction': [
//     { title: 'The Borthers Karamazov', author: 'Fyodor Dostoyevsky' },
//     // ...
//   ],
//   // ...
// }


const books = require('../consts/books.js').booksArray;

// console.log(books);

const result = books.reduce((acc, curr) => {
    if (typeof curr.genre !== 'object') acc.push({name: curr.genre, object: {title: curr.title, author: curr.author}});
    else {
        curr.genre.reduce((_, curr2) => {
            acc.push({name: curr2, object: {title: curr.title, author: curr.author}});
            return _;
        }, {});
    }
    return acc;
},
[]);

const result2 = result.reduce((acc, curr) => {
    if (acc[curr.name] === undefined) return {...acc, [curr.name]: [curr.object]};
    else return {...acc, [curr.name]: [...acc[curr.name], curr.object]};
}, {});

console.dir(result2, { depth: null });