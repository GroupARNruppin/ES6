class Duck {
    constructor(name, color, age, weight, image) {
        this.name = name;
        this.color = color;
        this.age = age;
        this.weight = weight;
        this.image = image;
    }

    show() {
        return `Name: ${this.name}<br> Color: <a style="color: ${this.color};">${this.color}</a><br> Age: ${this.age}<br> Weight: ${this.weight}<br> Image: <img src="${this.image}">`;
    }

    quack() {
        const quackCount = Math.floor((this.age * this.weight) / 2);
        const quackWords = Array(quackCount).fill('Quack').join('\n');
        return quackWords;
    }
}

let duck = null;

function createDuck() {
    const name = document.getElementById('name').value;
    const color = document.getElementById('color').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const image = document.getElementById('image').value;

    duck = new Duck(name ? name : "amit", color ? color : 'red', age ? age : 0, weight ? weight : 0, image ? image : 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Male_Mallard_quack.JPG/1200px-Male_Mallard_quack.JPG' );
    document.getElementById('duckForm').reset();
    document.getElementById('createButton').disabled = true;
    document.getElementById('showButton').disabled = false;
    document.getElementById('quackButton').disabled = false;
}

const showDuck = () => {
    document.getElementById('duckInfo').innerHTML = duck.show();
}

const quackDuck = async () => {
    document.getElementById('duckInfo').innerText = duck.quack();

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioElement = new Audio('Quack_Sound.m4a'); 

    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(audioContext.destination);

    for (let i = 0; i < 3; i++) {
        audioElement.play();
        await new Promise(resolve => audioElement.addEventListener('ended', resolve));
    }
}
