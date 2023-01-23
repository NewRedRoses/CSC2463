// Mark Abrahams CSC 2463
function setup() {
  createCanvas(450, 450);
}

function draw() {
  background("rgb(0,0,200)");

  // circle
  fill("green");
  stroke(255);
  strokeWeight(5);
  circle(215, 215, 225, 225);
  //star within circle
  fill("red");
  beginShape();
  // first point
  vertex(330, 190);
  vertex(250, 180);
  // second point
  vertex(220, 95);
  vertex(180, 190);
  // third point
  vertex(100, 180);
  vertex(165, 235);
  // 4th point
  vertex(140, 305);
  vertex(215, 265);
  // 5th point
  vertex(290, 305);
  vertex(265, 235);
  endShape(CLOSE);
}
