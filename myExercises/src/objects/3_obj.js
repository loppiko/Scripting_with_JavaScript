// Utwórz klasy Person i Animal dziedziczące po Creature oraz klasy Child i Adult dziedziczące po klasie Person. Każda z tych klas powinna mieć podstawowe właściwości i metody, takie jak imię (name), wiek (age), płeć (gender), poziom energii (energy – przyjmujący domyślnie 5, maksymalnie 10) i stan emocjonalny (mood – przyjmujący domyślnie wartość "relaxed"). Klasa Animal powinna mieć dodatkowe właściwości, takie jak rodzaj (type), a klasa Child dodatkowe właściwości, takie jak poziom szczęścia (happiness).

// Zaimplementuj poniższe metody uwzględniając zmianę m.in. wartości energy i mood i spełniającą poniższe warunki (do poniższych dopisz własne, aby metody były w miarę możliwości rozbudowane):

//     Child
//         learn()– uczy się czegoś nowego (zmniejsza wartość energy)
//         play()– bawi się (zwiększa poziom happiness, zmniejsza poziom energy i ustawia mood na "happy")
//         sleep()– śpi (zwiększa poziom energy o np. maksymalnie 5, nie może przekroczyć 10)
//         eat()– je (zmienia wartość mood na "good")
//     Adult
//         work() – idzie do pracy (zmniejsza poziom energy i ustawia mood na "tired")
//         rest() – odpoczywa (ustawia mood na "relaxed")
//         cook() – gotuje posiłek
//         eat() – je
//     Animal
//         eat() – je
//         drink() – pije
//         run() – biega
//         sleep() – idzie spać


class Creature {
    constructor(name, age, gender, energy, mood){
        this.name = name;
        this.age = age;
        this.gender = gender;
        if (energy === undefined) this.energy = 5;
        else this.energy = energy;
        if (mood === undefined) this.mood = "relaxed";
        else this.mood = mood;
    }
}

class Person extends Creature {
    constructor(name, age, gender, energy, mood){
        super(name, age, gender, energy, mood);
    }
}

class Animal extends Creature {
    constructor(name, age, gender, type, energy, mood){
        super(name, age, gender, energy, mood);
        this.type = type;
    }

    run() {
        console.log(`${this.name} is running`);
    }

    drink() {
        console.log(`${this.name} is drinking`);
    }

    sleep() {
        console.log(`${this.name} is sleeping`);
    }

    eat() {
        console.log(`${this.name} is eating`);
    }
}

class Child extends Person {
    constructor(name, age, gender, happiness, energy, mood){
        super(name, age, gender, energy, mood);
        this.happiness = happiness;
    }

    learn() {
        this.energy = this.energy - 1;
    }

    play() {
        this.happiness = this.happiness + 1;
        this.energy = this.energy - 1;
        this.mood = "happy";
    }

    sleep(energyAmount){
        this.energy = this.energy + energyAmount;
        if (this.energy > 10) this.energy = 10;
    }

    eat() {
        this.modd = "good";
    }
}

class Adult extends Person {
    constructor(name, age, gender, energy, mood){
        super(name, age, gender, energy, mood);
    }

    work() {
        this.mood = "tired";
        this.energy = this.energy - 1;
    }

    rest() {
        this.mood = "relaxed";
    }

    cook() {
        console.log(`${this.name} is making a diner...`);
    }

    eat() {
        console.log(`${this.name} is eating diner...`);
    }
}

const child = new Child("Adam", 10, "male", "5", "10");
const adult = new Adult("Anna", 20, "male", "5", "10");
const dog = new Animal("Reks", 2, "male", "5", "10");

child.play(); // Adam is playing!
adult.work(); // Anna is going to work!
dog.run(); // Reks is running!
