// ) W pliku series.js znajduje się lista seriali. Wykorzystując jedynie programowanie funkcyjne i jedynie funkcje wbudowane takie jak: reduce, sort, filter i push stwórz dwa obiekty miniseries i series, gdzie:

//     miniseries będzie tablicą zawierającą tylko miniseriale (jednosezonowe), posortowane alfabetycznie. Każdy z miniseriali powinien zawierać wyłącznie name, year i type. (Miniseriale rok rozpoczęcia i zakończenia mają taki sam)
//     series będzie trzyelementową tablicą tablic zawierającą seriale (bez miniseriali), gdzie:
//         pierwsza tablica będzie zawierała seriale rozpoczęte przed rokiem 2010
//         druga tablica będzie zawierała seriale rozpocząte między 2010 (włącznie) a 2020 rokiem
//         trzecia tablica będzie zawierała tablice rozpoczęte po 2020 (włącznie)

// Dodatkowo:

//     Seriale powinny być posortowane latami, od najstarszego tzn. wg roku rozpoczęcia, a następnie wg. roku zakończenia (jeśli serial nie ma roku zakończenia, to powinien wyświetlić się przed serialami, które rok zakończenia mają).
//     Gatunek powinien być zapisany jako string, nie jako tablica stringów:

//     ["Dramat", "Wojenny"] => "Dramat, Wojenny"

//     Między kolejnymi gatunkami, po przecinku znajduje się spacja.
//     Jeżeli serial nie ma roku zakończenia, to nie wyświetlamy go (tj. roku zakończenia) w obiekcie.

// // Output miniseries
// [
//   { name: "Czarnobyl", type: "Dramat", year: 2019 },
//   { name: "Gambit królowej", type: "Dramat", year: 2020 },
//   { name: "Kompania braci", type: "Dramat, Wojenny", year: 2001 },
//   { name: "Pacyfik", type: "Dramat, Wojenny", year: 2010 },
// ];

// // Output series
// [
//   [
//     // ...
//   ],
//   [
//     // ...
//     {
//       id: 14,
//       name: "Rick i Morty",
//       startYear: 2013,
//       type: "Komedia, Przygodowy, Sci-Fi, Animacja dla dorosłych",
//       seasons: 9,
//     },
//     {
//       id: 11,
//       name: "House of Cards",
//       startYear: 2013,
//       endYear: 2018,
//       type: "Dramat, Polityczny",
//       seasons: 6,
//     },
//     // ...
//   ],
//   [
//     // ...
//   ],
// ];


// ---------------------------


const series = require('../consts/series.js').series;

// miniSeries

const miniSeries = series.reduce((acc, curr) => {
    if (curr.seasons === 1) acc.push({name: curr.name, type: curr.type.reduce((acc2, curr2) => {
        if (acc2.length === 0) return `${curr2}`;
        else return `${acc2}, ${curr2}`;
    }, ""), year: curr.endYear});
    return acc;
}, []).sort((a, b) => {
    if (a.name > b.name) return 1;
    else return -1;
});

console.log(miniSeries);


// series

const resultS = series.reduce((acc, curr) => {
    const objecting = {id: curr.id, name: curr.name, startYear: curr.startYear, endYear: curr.endYear, type: curr.type.reduce((acc2, curr2) => {
        if (acc2.length === 0) return `${curr2}`;
        else return `${acc2}, ${curr2}`;
    }, ""), seasons: curr.seasons};
    if (curr.series !== 1 && curr.startYear < 2010) {
        acc[0].push(objecting);
    } else if (curr.series !== 1 && curr.startYear >= 2020) {
        acc[2].push(objecting);
    } else {
        acc[1].push(objecting);
    }
    return acc;
}, [[], [], []]);

const resultS2 = resultS.reduce((acc, curr) => {
    return [...acc, curr.sort((a, b) => {
        if (a.startYear > b.startYear) return 1;
        else if (a.startYear === b.startYear && b.endYear === null) return 1;
        else if (a.startYear === b.startYear && a.endYear > b.endYear) return 1;
        else return -1;
    })];
}, []);

const seriesAnswer = resultS2.reduce((acc, curr) => {
    return [...acc, curr.reduce((acc2, curr2) => {
        if (curr2.endYear === null) {
            return [...acc2, {id: curr2.id, name: curr2.name, startYear: curr2.startYear, type: curr2.type, seasons: curr2.seasons}];
        } else return [...acc2, curr2];
    }, [])];
}, []);

console.dir(seriesAnswer, { depth: null });