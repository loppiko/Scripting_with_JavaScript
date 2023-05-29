// Stwórz obiekt o nazwie CoffeeShop zawierający następujące zmienne:

// name – string (nazwa sklepu)
// menu – tablica obiektów, każdy z elementów zawiera:
//     item (nazwa elementu),
//     type (`food` lub `drink`),
//     price
// orders – na początku pusta tablica

// i siedem metod:

// addOrder – dodaje nazwę elementu na koniec tablicy orders, jeśli istnieje w menu i zwraca komunikat "Order added!". W przeciwnym razie zwróć "This item is currently unavailable!"
// fulfillOrder – jeśli orders nie jest pustą tablicą zwróć "The {item} is ready!". Jeśli tablica jest pusta zwróć "All orders have been fulfilled!".
// listOrders – zwraca listę przyjetych zamówień, w przeciwnym wypadku pustą tablicę
// dueAmount – zwraca całkowitą należność za realizowane zamówienia.
// cheapestItem – zwraca nazwę najtańszej pozycji w menu.
// drinksOnly – zwraca tylko nazwy pozycji typu drink z menu.
// foodOnly – zwraca tylko nazwy pozycji typu food z menu.

// Zamówienia realizowane są w kolejności FIFO (first-in, first-out)

// Pamiętaj, aby używać wyłącznie funkcji wbudowanych klasy Array (oprócz funkcji forEach()). Iteracje for, foreach i while zdecydowanie odpadają.

// // Przykład działania:

// // Tworzymy sklep o nazwie "Shop1", który zawiera w menu 3 pozycje:
// // [
// //   { item: "cinnamon roll", type: "food", price: 4.99 },
// //   { item: "hot chocolate", type: "drink", price: 2.99 }
// //   { item: "lemon tea", type: "drink", price: 2.50 }
// // ]
// // tablica zamówień jest pusta


// obj.addOrder("espresso"); // "This item is currently unavailable!" (Sklep nie sprzedaje espresso)

// obj.addOrder("hot chocolate"); // "Order added!"
// obj.addOrder("cinnamon roll"); // "Order added!"

// obj.listOrder(); // ["hot chocolate", "cinnamon roll"]

// obj.dueAmount(); // 7.98 (suma cen za hot chocolate i cinnamon roll)

// obj.fulfillOrder(); // "The hot chocolate is ready!"
// obj.fulfillOrder(); // "The cinnamon roll is ready!"
// obj.fulfillOrder(); // "All orders have been fulfilled!" (Wszystkie zamówienia zostały zrealizowane)

// obj.listOrder(); // []

// obj.dueAmount(); // 0.0

// obj.cheapestItem(); // "lemon tea"
// obj.drinksOnly(); // ["hot chocolate", "lemon tea"]
// obj.foodOnly(); // ["cinnamon roll"]


class CoffeeShop {
    constructor (name, menu) {
        this.name = name;
        this.menu = menu;
        this.orders = [];
    }

    addOrder(item) {
        const temp = this.menu.reduce(
            (acc, curr) => {
                return [...acc, curr.item];
            }, []
        );
        if (temp.find(el => el === item) === undefined) console.log("This item is currently unavailable!");
        else {
            this.orders.push(item);
            console.log("Order added!");
        }
    }

    fulfillOrder() {
        if (this.orders.length === 0) console.log(`All orders have been fulfilled!`);
        else {
            console.log(`The ${this.orders[0]} is ready!`);
            this.orders = this.orders.slice(1);
        }
    }

    listOrders() {
        console.log(this.orders);
    }

    dueAmount() {
        const prices = this.menu.reduce(
            (acc, curr) => {
                return {...acc, [curr.item]: curr.price};
            }, {}
        );
        console.log(prices);
        const result = this.orders.reduce((acc, curr) => {
            return acc + prices[curr];
        }, 0);
        console.log(result);
    }

    cheapestItem() {
        const pricesList = this.menu.reduce(
            (acc, curr) => {
                return [...acc, {name: curr.item, price: curr.price}];
            }, []
        );
        const result = pricesList.reduce((acc, curr) => {
            if (acc.name === undefined) return curr;
            else if (acc.price > curr.price) return curr;
            else return acc;
        }, {});
        console.log(result.name);
    }

    drinksOnly() {
        console.log(this.menu.reduce((acc, curr) => {
            if (curr.type === 'drink') return [...acc, curr.item];
            else return acc;
        }, []));
    }

    foodOnly() {
        console.log(this.menu.reduce((acc, curr) => {
            if (curr.type === 'food') return [...acc, curr.item];
            else return acc;
        }, []));
    }
}


const myCoffeShop = new CoffeeShop(
    "Shop1",
    [
      { item: "cinnamon roll", type: "food", price: 4.99 },
      { item: "hot chocolate", type: "drink", price: 2.99 },
      { item: "lemon tea", type: "drink", price: 2.50 }
    ]
);

console.log();
myCoffeShop.addOrder("espresso"); // "This item is currently unavailable!" (Sklep nie sprzedaje espresso)

myCoffeShop.addOrder("hot chocolate"); // "Order added!"
myCoffeShop.addOrder("cinnamon roll"); // "Order added!"

myCoffeShop.listOrders(); // ["hot chocolate", "cinnamon roll"]

myCoffeShop.dueAmount(); // 7.98 (suma cen za hot chocolate i cinnamon roll)

myCoffeShop.fulfillOrder(); // "The hot chocolate is ready!"
myCoffeShop.fulfillOrder(); // "The cinnamon roll is ready!"
myCoffeShop.fulfillOrder(); // "All orders have been fulfilled!" (Wszystkie zamówienia zostały zrealizowane)

myCoffeShop.dueAmount(); // 0 (suma cen za hot chocolate i cinnamon roll)


myCoffeShop.cheapestItem();
myCoffeShop.drinksOnly();
myCoffeShop.foodOnly();
console.log();