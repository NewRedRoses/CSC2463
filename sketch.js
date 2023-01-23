// Mark Abrahams CSC 2463
function setup() {
  createCanvas(400, 200);
}

function draw() {
  background(113, 214, 53);
  push();
  ellipse(100, 100, 100, 100);
  square(200, 50, 100);
  pop();
}
