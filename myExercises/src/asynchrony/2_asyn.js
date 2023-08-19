// Wykorzystując endpointy /posts/N oraz /posts/N/comments dostępne pod adresem:

// https://jsonplaceholder.typicode.com/

// oraz bibliotekę axios zaimplementuj niżej opisaną funkcjonalność:

//     Losuje 5 liczb z przedziału [0..99], które będą służyły jako identyfikatory „wpisów”
//     Z pomocą wymienionych powyżej usług – używając metody GET – pobiera wylosowane wpisy oraz listy powiązanych z nimi komentarzy
//     Przetwarza otrzymane dane tak, aby otrzymać tablicę obiektów JSON-owych postaci:

//     [
//       {
//         "entry": {
//           "title": "title 1",
//           "body": "expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum"
//         },
//         "comments": [
//           {
//             "name": "id labore ex et quam laborum",
//             "email": "Eliseo@gardner.biz",
//             "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora"
//           },
//           // ...
//           {
//             "name": "odio adipisci rerum aut animi",
//             "email": "Nikita@garfield.biz",
//             "body": "quia electus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates"
//           }
//         ]
//       },
//       // ...
//       {
//         "entry": {
//           "title": "title 5",
//           "body": "molestiae ut ut quas totam\nnostrum rerum"
//         },
//         "comments": [
//           {
//             "name": "id labore ex et quam laborum",
//             "email": "John@yellow.biz",
//             "body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora"
//           },
//           // ...
//           {
//             "name": "odio adipisci rerum aut animi",
//             "email": "Maria@targo.biz",
//             "body": "quia electus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates"
//           }
//         ]
//       }
//     ]

//     Wypisuje zawartość powyższej tablicy na standardowym wyjściu.

const axios = require('axios');
const _ = require('lodash');

const random = () => Math.floor(Math.random() * 100);

const randomUrls = Array(5).fill(0).reduce((acc) => {
    let randomNumber = random();
    return [...acc, [`https://jsonplaceholder.typicode.com/posts/${randomNumber}`, `https://jsonplaceholder.typicode.com/posts/${randomNumber}/comments`]   ]
    }, []);

const asyncFuntion = (randomUrls) => {
    const promisesArray = randomUrls.map(([firstUrl, secondUrl]) => [axios.get(firstUrl), axios.get(secondUrl)]);
    const helpFunction = (promisesArray, acc = []) => {
        if (promisesArray.length === 0) console.dir(acc, {depth: null});
        else {
            Promise.all(_.head(promisesArray))
                .then(([posts, comments]) => {
                    acc.push({
                        "entry": {"title": posts.data.title, "body": posts.data.body},
                        "comments": comments.data.reduce((acc, curr) => [...acc, {"name": curr.name, "email": curr.email, "body": curr.body}], [])
                    });
                    helpFunction(_.tail(promisesArray), acc);
                })
        }
    }
    helpFunction(promisesArray);
}
// [[Promise1, Promise2], []]
asyncFuntion(randomUrls);


