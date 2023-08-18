// Napisz funkcję (nie korzystając z mechanizmu async/await):

// const poKolei = (fun1, fun2, fun3, cb) => {
//   // Uzupełnij
// };

// taką, że:

//     Jej trzema pierwszymi argumentami są funkcje zwracające promise – możesz założyć, że funkcje te muszą być przygotowane na przyjęcie określonej listy argumentów, z których korzystać będzie poKolei.
//     Funkcja poKolei powinna zapewnić, że fun3 wykona się po fun2, która wykona się zawsze po fun1. Wyniki wygenerowane przez fun1 zostaną przekazane do fun2, a wynik fun2 zostanie przekazany do fun3.
//     Czwartym argumentem funkcji jest „callback” cb, czyli funkcja, której zadaniem jest przetworzenie wyników zwracanych przez fun3.
//     Jeżeli którykolwiek z promise'ów zakończy się porażką, funkcja ma dalej kontynuować swoje zadanie.

// (

const _ = require('lodash');

const fun1 = (arg = 0) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(arg);
            res(1 + arg)
        }, 2000);
    })
}

const fun2 = (arg = 0) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(arg);
            res(2 + arg)
        }, 3000);
    })
}

const fun3 = (arg = 0) => {
    return new Promise((res) => {
        setTimeout(() => {
            console.log(arg);
            res(3 + arg)
        }, 1000);
    })
}

const callback = (result) => console.log(`Your sum is equal: ${result}`);


const poKolei = (fun1, fun2, fun3, cb) => {
    let res1 = fun1()
    .then((res) => res1 = res)
    .catch((res) => res1 = res)
    .finally(() => {
        let res2 = fun2(res1)
        .then((res) => res2 = res)
        .catch((res) =>  res2 = res)
        .finally(() => {
            let res3 = fun3(res2)
            .then((res) => res3 = res)
            .catch((res) => res3 = res)
            .finally(() => cb(res3))
        })
    })
};  
  
  
poKolei(fun1, fun2, fun3, callback)