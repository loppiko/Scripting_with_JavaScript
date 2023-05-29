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


const ships = require('../consts/ships.js').shipsArray;


const result = ships.reduce((acc, curr) => {
    const value = curr.crew.reduce((_, curr2) => {
        if (acc[curr2] === undefined) return {...acc, [curr2]: [`1. ${curr.model}, manufacturer: ${curr.manufacturer}`]};
        else return {...acc, [curr2]: [...acc[curr2], `${acc[curr2].length + 1}. ${curr.model}, manufacturer: ${curr.manufacturer}`]};
    }, {});
    return {...acc, ...value};
}, {});

const result2 = Object.keys(result).reduce((acc, curr) => {
    return `${acc}\n${curr}:\n${result[curr].reduce((acc2, curr2) => {
        return `${acc2}\n${curr2}`;
    })}\n`;
}, "");

console.log(result);
console.log(result2);

