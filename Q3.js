clocks = [];
class Clock {
  constructor(country, hour, min, sec) {
    this.country = country;
    this.hour = hour;
    this.min = min;
    this.sec = sec;
  }

  convertToSeconds = function () {
    return (
      parseInt(this.hour) * 3600 + parseInt(this.min) * 60 + parseInt(this.sec)
    );
  };

  show = function () {
    const clocksContainer = document.getElementById("clocksContainer");
    var paragraph = document.createElement("p");
    paragraph.innerHTML =
      `Country: ${this.country}, ${this.hour}:${this.min}:${this.sec} Time in seconds: ` +
      this.convertToSeconds();
    clocksContainer.appendChild(paragraph);
  };
}

function showClocks(clocks) {
  const clocksContainer = document.getElementById("clocksContainer");
  clocksContainer.innerHTML = "";
  clocks.forEach((clock) => {
    clock.show();
  });
}

document
  .getElementById("clockForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const country = document.getElementById("country").value;
    const hour = document.getElementById("hour").value;
    const minute = document.getElementById("minute").value;
    const second = document.getElementById("second").value;

    var clock = new Clock(country, hour, minute, second);
    console.log(654654);

    clocks.push(clock);

    if (clocks.length == 5) {
      document.getElementById("sub").style.display = "none";
      showClocks(clocks);
    }
  });
