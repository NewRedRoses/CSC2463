// Mark Abrahams CSC 2463
function setup() {
  createCanvas(350, 300);
}

function draw() {
  background(0);

  // Pacman
  push();
  fill("rgba(248, 200, 18, 1)");

  arc(50, 50, 90, 80, 0, PI + HALF_PI);
  pop();
  // Red Enemy
  push();
  fill("red");
  rect(150, 10, 80, 85, 70, 70, 10, 5);
  // White eyes area
  fill("white");
  noStroke();
  circle(170, 40, 20);
  circle(210, 40, 20);
  fill("blue");
  circle(170, 40, 10);
  circle(210, 40, 10);
  pop();
}
