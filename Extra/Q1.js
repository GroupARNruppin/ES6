class Counter {
  number = 0;

  init = function () {
    this.number = document.getElementById("inpt").value;
  };

  increment = function () {
    this.number = parseInt(this.number) + 1;
  };

  go = function () {
    var p = "";
    var div = document.getElementById("numbers");
    div.innerHTML = "";
    for (let i = 0; i < this.number; i++) {
      p = document.createElement("p");
      p.innerHTML = i;
      div.append(p);
    }
  };
}
