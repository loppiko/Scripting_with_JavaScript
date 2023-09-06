// Zdefiniuj:

const { split } = require("lodash");

// konstruktor klasy Vector2 posiadający:
//     pola x i y
//     funkcje
//         diff(vector) – odejmuje aktualny wektor od wektora podanego w argumencie
//         multiplyBy(number) – mnoży x i y wektora razy liczbę podaną w argumencie
//         toString() – zwraca tekst w formacie "x: {wartość} y: {wartość}"
// konstruktor klasy Ship o następujących:
//     polach:
//         faction
//         position – typu Vector2
//         strength
//         health
//     funkcjach:
//         getDistance(enemyShip) – jeśli to możliwe, oblicza dystans dzielący dwa statki (różnicę wektorów). W przeciwnym wypadku wypisuje komunikat błędu
//         checkHealth() – sprawdza, czy zdrowie statku spadło poniżej 0. Jeśli tak wypisuje w konsoli odpowiedni komunikat
//         getDamage(amount) – obniża liczbę punktów zdrowia o podaną liczbę i sprawdza, czy statek został zniszczony
//         makeDamage(enemyShip) – zadaje obrażenia statkowi podanemu w argumencie (o wartość zmiennej strength)
// klasę RebelShip dziedziczącą po Ship:
//     niech konstruktor przyjmuje parametry: position, strength, health.
//     wartość faction powinna być na stałe ustawiona jako 'Rebel Alliance'.
//     zdefiniuj funkcję dla klasy RebelShip:
//         hyperspeed() – ustawia wartość position na undefined
// klasę DeathStar dziedziczącą po Ship
//     niech konstruktor przyjmuje parametr: position
//     niech faction będzie ustawiony na stałe na 'Empire'.
//     niech klasa zawiera następujące pola: deathRayAvailable
//     zawierającą funkcje:
//         makeDamage(enemyShip) – jeśli deathRayAvailable jest ustawione na true, to wywołuje funkcje odziedziczoną po Ship, a następnie ustawia deathRay na niedostępny na ustaloną liczbę sekund. Jeśli deathRayAvailable jest równe false, drukuje komunikat.

// W razie potrzeby można zadeklarować zmienne i funkcje pomocnicze w klasie DeathStar.

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }


    diff(diffVector) {
        console.log(`Subtraction of your vectors equals:\nx: {${this.x - diffVector.x}} y: {${this.y - diffVector.y}}`);
    }


    multiplyBy(number) {
        this.x *= number;
        this.y *= number;
        console.log(`Your vector has been multiplied`);
    }


    toString() {
        console.log(`x: {${this.x}} y: {${this.y}}`);
    }
}

class Ship {
    constructor(name, faction, position, strength, health) {
        this.name = name;
        this.faction = faction;
        this.position = position;
        if (!(this.position instanceof Vector)) throw new Error(`Variable "position" is not instance of class {Vector} in ship ${this.name}`);
        (typeof strength === "number" && strength > 0) ? this.strength = strength : this.strength = 0;
        (typeof health === "number" && health > 0) ? this.health = health : this.health = 0;
        this.destroyed = false;
    }


    getDistance(enemyShip) {
        if (this.destroyed) {
            console.log(`${this.name} has been already destroyed`);
            return;
        }
        (!enemyShip.position || !this.position) ? console.log(`Distance beetween ${this.name} and ${enemyShip.name} is immeasurable`) : this.position.diff(enemyShip.position);
    }


    checkHealth() {
        (this.health < 0) ? console.log(`${this.name} has drowned`) : console.log(`${this.name} have ${this.health} HP`);
    }


    getDamage(amount) {
        if (this.destroyed) {
            console.log(`${this.name} has been already destroyed`);
            return;
        }
        this.health -= amount;
        (this.health < 0) ? this.destroyed = true : this.destroyed = false;
        this.checkHealth();
    }


    makeDamage(enemyShip) {
        if (!(enemyShip instanceof Ship)) {
            console.log(`${enemyShip} is not a ship!`);
            return;
        }
        enemyShip.getDamage(this.strength);
    }
}

class RebelShip extends Ship {
    constructor(name, position, strength, health) {
        super(name,'Rebel Alliance', position, strength, health);
    }

    hyperSpeed() {
        this.position = undefined;
    }

}

class DeathStar extends Ship {
    constructor(name, position, health) {
        super(name, 'Empire', position, 100, health);
        this.deathRayAvaible = true;
    }

    makeDamage(enemyShip) {
        if (this.deathRayAvaible) {
            this.deathRayAvaible = false;
            super.makeDamage(enemyShip);
            setTimeout(() => this.deathRayAvaible = true, 10000);
            console.log(`Death ray was used to destroy ${enemyShip.name}`);
        } else console.log(`Death ray is now charging and need a time to be used`);
    }
}

const louis = new Ship("St. Louis", "USA", new Vector(2, 1), 3, 5);
const fuso = new Ship("Fuso", "Japan", new Vector(3, 4), 6, 6);
const u238 = new Ship("U-238", "Japan", new Vector(5, 3), 12, 5);
const izumo = new Ship("Izumo", "Japan", new Vector(5, 5), 8, 15);
const montana = new RebelShip("Montana", new Vector(1, 1), 18, 15);
const yamato = new RebelShip("Yamato", new Vector(4, 3), 25, 27);
const minotaur = new RebelShip("Minotaur", new Vector(1, 2), 20, 30);
const enterprise = new DeathStar("USS Enterprise", new Vector(2, 2));

louis.checkHealth();
fuso.makeDamage(montana);
enterprise.makeDamage(izumo);
yamato.getDistance(minotaur)
u238.makeDamage(louis);

