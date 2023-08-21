// const grupuj = (funTab1, funTab2, cb) => { ... };

// spełaniającą poniższe warunki:

//     Dwoma pierwszymi argumentami funkcji grupuj są tablice funkcji asynchronicznych zwracające wartość liczbową.
//     Funkcja grupuj powinna zapewnić, że wszystkie funkcje z obu tablic będą wykonywać się „równolegle”.
//     Funkcja grupuj powinna wywoływać funkcję cb, która przyjmuje jako parametr pogrupowane wyniki z wszystkich funkcji w formacie:

//     [
//       [ wynik_funkcji_1_z_funTab1, wynik_funkcji_1_z_funTab2 ],
//       [ wynik_funkcji_2_z_funTab1, wynik_funkcji_2_z_funTab2 ],
//       [ wynik_funkcji_3_z_funTab1, wynik_funkcji_3_z_funTab2 ],
//       [ wynik_funkcji_4_z_funTab1, wynik_funkcji_4_z_funTab2 ],
//       [ wynik_funkcji_5_z_funTab1, wynik_funkcji_5_z_funTab2 ],
//       // ...
//     ]

//     i drukuje je w konsoli w dowolny sposób.
//     Jeżeli liczba funkcji w obu tablicach nie jest równa, to funkcja grupuj powinna uzupełniać brakujące wyniki wartością 0.


const _ = require('lodash');
// const axios = require('axios');

const fun1 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(1)
        }, 1000);
    })
}


const fun2 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(2)
        }, 1400);
    })
}


const fun3 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(3)
        }, 1200);
    })
}


const fun4 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(4)
        }, 700);
    })
}


const fun5 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(5)
        }, 500);
    })
}


const fun6 = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res(6)
        }, 1500);
    })
}

const funTab1 = [fun1, fun2, fun3];
const funTab2 = [fun4, fun5];


const mainFunction = (funTab1, funTab2, cb) => {
    if (funTab1.length < funTab2.length) funTab1.push(...Array(funTab2.length - funTab1.length).fill(() => 0));
    if (funTab1.length > funTab2.length) funTab2.push(...Array(funTab1.length - funTab2.length).fill(() => 0));
    const help = (funTab1, funTab2, acc = []) => {
        if (funTab1.length === 0) cb(acc);
        else {
            Promise.all([_.head(funTab1)(), _.head(funTab2)()])
                .then((res) => help(_.tail(funTab1), _.tail(funTab2), [...acc, res]));
        }
    }
    help(funTab1, funTab2);
}

mainFunction(funTab1, funTab2, (res) => console.log(res));