class Duck {
  constructor(name, color, age, weight, picture) {
    this.name = name;
    this.color = color;
    this.age = age;
    this.weight = weight;
    this.picture = picture;
  }

  show = function () {
    const duckInfoContainer = document.getElementById("duckInfoContainer");
    duckInfoContainer.innerHTML = "";
    const quacksContainer = document.getElementById("quacksContainer");
    quacksContainer.innerHTML = "";

    const paragraph = document.createElement("p");
    paragraph.innerHTML = `Name: ${this.name}, Color: ${this.color}, Age: ${this.age}, Weight: ${this.weight}, Picture: ${this.picture}`;
    duckInfoContainer.appendChild(paragraph);
  };

  quack = function () {
    const duckInfoContainer = document.getElementById("duckInfoContainer");
    duckInfoContainer.innerHTML = "";
    var audio = new Audio("../sounds/quack.mp3");
    var p = document.createElement("p");
    var div = document.getElementById("quacksContainer");
    div.innerHTML = "";

    for (var i = 0; i < (this.age * this.weight) / 2; i++) {
      p.innerHTML += " Quack";
    }

    function playSound(times) {
      if (times > 0) {
        audio.play();
        setTimeout(function () {
          playSound(times - 1);
        }, 500);
      }
    }
    playSound(3);

    div.appendChild(p);
  };
}
document
  .getElementById("duckForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Fetch values from the form
    const name = document.getElementById("name").value;
    const color = document.getElementById("color").value;
    const age = parseInt(document.getElementById("age").value);
    const weight = parseInt(document.getElementById("weight").value);
    const picture = document.getElementById("picture").value;

    // Create a new Duck object
    var newDuck = new Duck(name, color, age, weight, picture);

    document.getElementById("createDuck").style.display = "none";
    document.getElementById("ShowDuck").style.display = "block";
    document.getElementById("quackBtn").style.display = "block";
    // Display the new duck's information
    console.log(newDuck);

    document.getElementById("ShowDuck").onclick = function () {
      newDuck.show();
    };

    document.getElementById("quackBtn").onclick = function () {
      newDuck.quack();
    };
  });
