// Celem zadania będzie ukończenie prostej gry żeglarskiej. Gra składa się z:

// planszy (klasa Grid)
// kafelka (klasa Tile)
// statku (klasa Ship)

// Plansza jest zbudowana w oparciu o kwadraty, nazywane kafelkami. Przykładowo, jeżeli plansza ma rozmiar 4x4 oznacza to, że składa się z 16 kafelków (16 instancji klasy Tile).

// class Tile {
// type = null;
// x = null;
// y = null;
// }

// class Grid {
// height = null; // liczba całkowita
// width = null; // liczba całkowita
// grid = null; // tablica dwuwymiarowa
// ships = null; // tablica jednowymiarowa
// }

// class Ship {
// direction = null; // string
// x = null; // liczba całkowita
// y = null; // liczba całkowita
// grid = null; // obiekt klasy Grid
// }

// // Funkcja losująca typ kafelka:
// const types = ["LAND", "WATER", "ICE"];
// const itemType = types[Math.floor(Math.random() * types.length)];

// Uzupełnij klasę Tile o:

// konstruktor, który przyjmuje parametry x, y oraz type. X i Y to koordynaty kafelka na planszy, a type może przyjmować tylko wartości "LAND", "WATER" i "ICE". Wartości parametrów powinny zostać przypisane do zmiennych istniejących w klasie.
// funkcję getTileInfo, która zwraca koordynaty i typ kafelka jako string

// Uzupełnij klasę Grid o:

// funkcję generate, która przyjmuje jako parametry: height i width (będące liczbami całkowitymi). Parametry nadają wartość zmiennym istniejącym w klasie. Oprócz tego funkcja powinna tworzyć planszę o podanych rozmiarach, poprzez inicjalizację tablicy dwuwymiarowej Grid. Każdy element planszy musi być obiektem klasy Tile o określonym typie ("LAND", "WATER" albo "ICE"). Typ powinien być losowy dla każdego elementu.
// funkcję generatePredefined, która przyjmuje jako parametry height, width oraz predefinedTiles. Funkcja ta działa analogicznie jak poprzednia, z tą różnicą, że w wybranych przez nas miejscach wstawimy przygotowane przez siebie kafelki. PredefinedTiles to tablica obiektów klasy Tile, które to wstawia w wybranych miejscach planszy (np. jeżeli obiekt klasy Tile ma wartości: x = 10 i y = 20), to na planszy w koordynatach 10 i 20 ma zostać wstawiony dany kafelek.
// funkcję getTile z parametrami x i y – funkcja zwraca kafelek w danych koordynatach. Jeżeli w danych koordynatach nie istnieje żaden kafelek, to zostaje zwrócone null.

// // Przykład użycia:
// const grid = new Grid();
// grid.generate(10, 10); // generuje planszę o wymiarach 10 x 10
// console.log(grid.getTile(2, 2).getTileInfo()) // 2,2 LAND
// grid.generate(10, 5); // na nowo generuje planszę o wymiarach 10 x 5

// const predefTiles = [
// new Tile(1, 2, "LAND"),
// new Tile(2, 2, "WATER"),
// new Tile(5, 5, "ICE")
// ];

// grid.generatePredefined(10, 10, predefTiles);
// console.log(grid.getTile(2, 2).getTileInfo()) // 2,2 WATER

// Uzupełnij klasę Ship o:

// konstruktor, który przyjmuje parametry: direction – czyli w jakim kierunku jest zwrócony aktualnie statek ("N", "S", "E" lub "W"), x i y – aktualne koordynaty statku, grid – plansza, na której jest umieszczony statek. Statek nie może pojawić się na kafelku oznaczonym "LAND" lub "ICE". Statek zostaje również wtedy dodany do tablicy "ships" w obiekcie grid.
// funkcję turn, która będzie zmieniać kierunek statku (ale nadal będzie pozostawał na tym samym kafelku). Obracać może się zgodnie lub przeciwnie do ruchu wskazówek zegara.
// funkcję sail, która będzie przesuwała statek o jeden kafelek w aktualnym kierunku statku. Zadbaj o to, żeby statek nie mógł się poruszyć na kafelek typu "LAND" lub "ICE" – program powinien wtedy wyświetlać odpowiedni komunikat. Statek nie powinien móc również wypłynąć poza planszę, ani też uderzyć o inny statek (na planszy może być kilka statków).
// funkcję getShipInfo, która zwraca kierunek oraz koordynaty statku jako string.

// // Przykład użycia:
// const ship = new Ship(2, 4, "N", grid);
// const ship2 = new Ship(1, 2, "N", grid); // błąd

// ship.turn("P"); // Statek obrócony o 90 st. w prawo
// ship.sail(); // Statek poruszył się o 1 kafelek na wschód
// ship.sail(); // Statek napotkał ląd, pozostał w miejscu
// ship.turn("L") // Statek obrócony o 90 st. w lewo
// ship.sail(); // Statek napotkał inny statek, pozostał w miejscu

// Stwórz klasę IcebreakerShip, która dziedziczy po klasie Ship. Uzupełnij ją o:

// konstruktor, który przyjmuje x i y – aktualne pozycje lodołamacza oraz grid – planszę statku. Statek ten zawsze pojawia się skierowany na północ.
// funkcja turn powinna obracać kierunek statku o 180 stopni.
// funkcja sail powinna umożliwiać poruszanie się zarówno po kafelkach o typie "WATER" jak i "ICE". Jeśli statek trafi na pole o typie "LAND" automatycznie się obraca o 90 stopni zgodnie z ruchem wskazówek zegara (wywołuje funkcję turn z klasy Ship).

// // Przykład użycia:
// const icebreaker = new Icebreaker(3, 5, grid);

// icebreaker.sail(); // Statek napotkał lądolód, przedarł się przez niego
// console.log(icebreaker.getShipInfo()); // "N", 3,6

// Dodatkowo, w odpowiednim miejscu dopisz funkcje printGrid, która zwraca planszę (jako string) ze wszystkimi znajdującymi się elementami, gdzie:

// "~" – będzie oznaczać pole "WATER"
// "x" – będzie oznaczać pole "ICE"
// "o" – będzie oznaczać pole "LAND"
// "N", "S", "E" lub "W" będzie oznaczać statek odwrócony w odpowienim kierunku

// // Przykładowy output:
// ~ ~ ~ ~ ~ o
// ~ ~ x E ~ o
// S ~ ~ ~ ~ ~
// o o ~ ~ ~ ~


const _ = require('lodash');
const ships = [];

class Tile {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = (type === "LAND" || type === "ICE" || type === "WATER") ? type : "WATER";
    }

    getTileInfo() {
        console.log(`X: ${this.x}\nY: ${this.y}\ntype: ${this.type}`);
    }
  }

class Grid {
    constructor() {
        this.grid = [];
    }

    generate(height, width) {
        const types = ["LAND", "WATER", "ICE"];
        const rowGen = (width, row = []) => (row.length === width) ? row : rowGen(width, [...row, new Tile(width + 1, height + 1, types[Math.floor(Math.random() * types.length)])]);
        this.grid.push(rowGen(width));
        if (this.grid.length < height) this.generate(height, width);
    }

    generatePredefined(height, width, predefTiles) {
        this.grid = this.generate(height, width);
        predefTiles.forEach(tile => this.grid[tile.y - 1][tile.x - 1] = tile);
        return this.grid;
    }

    getTile(x, y) {
        return (this.grid[y - 1][x - 1] === undefined) ? null : this.grid[y - 1][x - 1];
    }

    printGrid() {
        const tempGrid = [...this.grid];
        ships.reduce((_, curr) => tempGrid[curr.y][curr.x] = curr, []);
        return this.grid.map((row) => row.reduce((acc, elem) => {
            if (elem.type === undefined) return [...acc, elem.direction];
            else if (elem.type === "WATER") return [...acc, "~"];
            else if (elem.type === "ICE") return [...acc, "x"];
            else return [...acc, "o"];
        }, []).join(" ")).join("\n");
    }
}

class Ship {
    constructor(x, y, direction, myGrid, name) {
        this.name = name;
        this.x = x - 1;
        this.y = y - 1;
        this.direction = direction;
        this.grid = myGrid;
        this.exist = (myGrid[this.y][this.x].type === "WATER") ? true : false;
        if (!this.exist) console.log(`Ship ${name} can't appear on tile: ${myGrid[this.y][this.x].type}`);
        else ships.push(this);
    }

    turn(side) {
        if (!this.exist) return;
        if (side === "P") {
            if (this.direction === "N") this.direction = "E";
            else if (this.direction === "E") this.direction = "S";
            else if (this.direction === "S") this.direction = "W";
            else this.direction = "N";
        } else {
            if (this.direction === "N") this.direction = "W";
            else if (this.direction === "E") this.direction = "N";
            else if (this.direction === "S") this.direction = "E";
            else this.direction = "S";
        }
    }

    sail() {
        if (!this.exist) return;
        const iceBreaker = (this instanceof Ship) ? false : true;
        const poleChecking = (x, y) => {
            if (y < 0 || y >= this.grid.length || x < 0 || x >= this.grid[0].length) console.log(`${this.name} didn't move because it would have floated off the board`);
            else if ((this.grid[y][x].type !== "WATER" && !iceBreaker) || (this.grid[y][x].type === "LAND" && iceBreaker)) console.log(`${this.name} didn't move because it landed on a space it couldn't swim to (${this.grid[y][x].type})`);
            else if (ships.some((elem) => elem.x === x && elem.y === y && elem !== this)) console.log(`${this.name} didn't move because it would have hit another ship`);
            else {
                console.log(`${this.name} has moved`);
                this.x = x;
                this.y = y;
            }
        };

        if (this.direction === "N") poleChecking(this.x, this.y + 1);
        else if (this.direction === "E") poleChecking(this.x - 1, this.y);
        else if (this.direction === "S") poleChecking(this.x, this.y - 1);
        else poleChecking(this.x + 1, this.y);
    }

    getShipInfo() {
        if (!this.exist) return;
        console.log( `--- ${this.name} --- \nX: ${this.x}   Y: ${this.y}   Direction: ${this.direction}\n`);
    }
}

class IcebreakerShip extends Ship {
    constructor(x, y, myGrid, name) {
        super(x - 1, y - 1, "N", myGrid, name);
        this.exist = (myGrid[this.y][this.x].type !== "LAND") ? true : false;
        if (!this.exist) console.log(`Ship ${name} can't appear on tile: ${myGrid[this.y][this.x].type}`);
        else ships.push(this);
    }

    turn() {
        if (!this.exist) return;
        this.direction = (this.direction === "N") ? "S" : "N";
    }

    sail() {
        super.sail(true);
    }
}


const myGrid = new Grid();
myGrid.generate(6, 6);

// const predefTiles = [
//     new Tile(2, 1, "WATER"),
//     new Tile(2, 2, "WATER"),
//     new Tile(3, 3, "ICE")

//     // new Tile(5, 5, "ICE")
//   ];
// myGrid.generatePredefined(6, 6, predefTiles);
console.log(myGrid.printGrid(), "\n");
// console.log(myGrid.getTile(2, 2));

const ship = new Ship(2, 1, "N", myGrid.grid, "Pirate's Ship");
const ship2 = new IcebreakerShip(3, 3, myGrid.grid, "TheIcebreaker");
const ship3 = new Ship(2, 3, "N", myGrid.grid, "U-Boot");

ship3.sail();
ship2.sail();
ship.sail();

console.log(myGrid.printGrid(), "\n");
// ship3.getShipInfo();
// ship.getShipInfo();


// myGrid.getTile(1, 2).getTileInfo(); // 2,2 WATER