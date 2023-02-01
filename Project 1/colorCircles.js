// Mark Abrahams CSC 2463
function setup() {
  createCanvas(350, 300);
}

function draw() {
  background(280);
  push();
  // White background
  fill("rgba(18, 109, 248, 0.4)");

  noStroke();
  ellipse(100, 100, 100, 100);
  pop();
  push();
  fill("rgba(0,255,0, 0.5)");
  noStroke();
  ellipse(150, 100, 100, 100);
  pop();
  push();
  noStroke();
  fill("rgba(248, 18, 18, 0.5)");
  ellipse(120, 50, 100, 100);
}
