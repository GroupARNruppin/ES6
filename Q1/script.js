class Counter {
    constructor() {
        this._counter = 0;
    }

    set counter(value) {
        this._counter = value;
    }

    get counter() {
        return this._counter;
    }

    increment() {
        this._counter++;
    }
}

const myCounter = new Counter();

const startButton = document.getElementById('startButton');
const incrementButton = document.getElementById('incrementButton');
const displayButton = document.getElementById('displayButton');
const inputElement = document.getElementById('counterInput');

const startCounter = () => {
    const inputValue = parseInt(inputElement.value, 10);

    if (!isNaN(inputValue)) {
        myCounter.counter = inputValue;
        
        inputElement.disabled = true;

        startButton.disabled = true;

        incrementButton.disabled = false;
        displayButton.disabled = false;
    }

}

const incrementCounter = () => {
    document.getElementById('printNumbers').innerText = ""
    myCounter.increment();
    inputElement.value = myCounter.counter;
}

const displayCounter = () => {
    for (let i = 0; i <= myCounter.counter; i++) {
        document.getElementById('printNumbers').innerText += `${i}, `
    }
}
