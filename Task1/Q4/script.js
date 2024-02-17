class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  Show = function () {
    const pointsContainer = document.getElementById("pointsContainer");
    var paragraph = document.createElement("p");
    paragraph.innerHTML = `(${this.x},${this.y})`;
    pointsContainer.appendChild(paragraph);
  };
  Equals = function (p) {
    return p.x == this.x && p.y == this.y;
  };
}

function TwoPointsEqualsByVars(points, x, y) {
  for (let i = 0; i < points.length; i++) {
    if (points[i].x == x && points[i].y == y) {
      return true;
    }
  }
  return false;
}

function TwoPointsEqualsByPoint(points, point) {
  flag = false;
  points.forEach((pnt) => {
    if (pnt.x == point.x && pnt.y == point.y) {
      flag = true;
    }
  });
  return flag;
}

function totalDistance(points) {
  var distance = 0;
  for (let i = 0; i < points.length - 1; i++) {
    points[i].Show();
    distance += parseFloat(distanceBetween2Points(points[i], points[i + 1]));
  }
  points[points.length - 1].Show();
  const pointsContainer = document.getElementById("pointsContainer");
  var paragraph = document.createElement("p");
  paragraph.innerHTML = `Total Distance: ${distance}`;
  pointsContainer.appendChild(paragraph);
}

function distanceBetween2Points(point1, point2) {
  var ret = parseFloat(
    Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    )
  );
  const pointsContainer = document.getElementById("pointsContainer");
  var paragraph = document.createElement("p");
  paragraph.innerHTML = `Distance between (${point1.x},${point1.y}) and (${point2.x},${point2.y}) is ${ret}`;
  pointsContainer.appendChild(paragraph);
  return ret;
}
