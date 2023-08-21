class Counter {
    myCounter = null;

    counter = 1;


    startCounter() {
        this.myCounter = setInterval(() => {
            console.log(this.counter);
            this.counter = this.counter + 1;
        }, 1000);
    }

    endCounter() {
        clearInterval(this.myCounter);
        this.myCounter = null;
    }

    clearCounter() {
        this.counter = 1;
    }
}

const myCounter = new Counter();
setInterval(() => {
    document.getElementById("counting").innerHTML = myCounter.counter;
}, 0);

function startCounter() {
    if (myCounter.myCounter === null) myCounter.startCounter();
}

function endCounter() {
    myCounter.endCounter();
}

function clearCounter() {
    myCounter.clearCounter();
}


