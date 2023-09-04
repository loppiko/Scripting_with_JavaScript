// Zdefiniuj:

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
        (typeof strength === Number && strength > 0) ? this.strength = strength : this.strength = 0;
        (typeof health === Number && health > 0) ? this.health = health : this.health = 0;
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
        this.name = name;
        this.faction = 'Rebel Alliance'
        this.position = position;
        if (!(this.position instanceof Vector) || this.position !== undefined) throw new Error(`Variable "position" is not instance of class {Vector} in ship ${this.name}`);
        (typeof strength === Number && strength > 0) ? this.strength = strength : this.strength = 0;
        (typeof health === Number && health > 0) ? this.health = health : this.health = 0;
    }

    hyperSpeed() {
        this.position = undefined;
    }

}

const ship = new Ship("a", "b", new Vector(1, 1), 1, 1);
