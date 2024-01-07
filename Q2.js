class Duck {
  name;
  color;
  age;
  weight;
  picture;

  show = function () {
    const duckInfoContainer = document.getElementById("duckInfoContainer");
    const paragraph = document.createElement("p");
    paragraph.innerHTML = `Name: ${myDuck.name}, Color: ${myDuck.color}, Age: ${myDuck.age}, Weight: ${myDuck.weight}, Picture: ${myDuck.picture}`;
    duckInfoContainer.appendChild(paragraph);
  };

  quack = function () {
    for (var i = 0; i < (this.age * this.weight) / 2; i++) {
      p = document.createElement("p");
      p.innerHTML += " Quack";
    }
  };
}
