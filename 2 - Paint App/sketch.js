//  Mark Abrahams
// CSC 2463

let mouseClicked = false;

function setup() {
  createCanvas(800, 700);
  // creates instances for each color
  colorRed = new Color(0, 0, 30, "red");
  colorOrange = new Color(0, 30, 30, "orange");
  colorYellow = new Color(0, 60, 30, "yellow");
  colorGreen = new Color(0, 90, 30, "green");
  colorCyan = new Color(0, 120, 30, "cyan");
  colorBlue = new Color(0, 150, 30, "blue");
  colorMagenta = new Color(0, 180, 30, "magenta");
  colorBrown = new Color(0, 210, 30, "brown");
  colorWhite = new Color(0, 240, 30, "white");
  colorBlack = new Color(0, 270, 30, "black");

  // declares the squares for each color.
  colorRed.setup();
  colorOrange.setup();
  colorYellow.setup();
  colorGreen.setup();
  colorCyan.setup();
  colorBlue.setup();
  colorMagenta.setup();
  colorBrown.setup();
  colorWhite.setup();
  colorBlack.setup();
}
// works like default color
let colorSelected = "black";

function mousePressed() {
  mouseClicked = true;
}

function draw() {
  // By far not optimal at all but I had to turn something in quick.

  //Checks position of mouse in relation to color

  if (mouseX >= 0 && mouseX <= 30) {
    if (mouseY >= 0 && mouseY <= 29 && mouseIsPressed) {
      colorSelected = "red";
    }
    if (mouseY >= 31 && mouseY <= 59 && mouseIsPressed) {
      colorSelected = "orange";
    }
    if (mouseY >= 60 && mouseY <= 89 && mouseIsPressed) {
      colorSelected = "yellow";
    }
    if (mouseY >= 90 && mouseY <= 119 && mouseIsPressed) {
      colorSelected = "green";
    }
    if (mouseY >= 120 && mouseY <= 149 && mouseIsPressed) {
      colorSelected = "cyan";
    }
    if (mouseY >= 150 && mouseY <= 189 && mouseIsPressed) {
      colorSelected = "blue";
    }
    if (mouseY >= 190 && mouseY <= 210 && mouseIsPressed) {
      colorSelected = "magenta";
    }
    if (mouseY >= 211 && mouseY <= 240 && mouseIsPressed) {
      colorSelected = "brown";
    }
    if (mouseY >= 241 && mouseY <= 270 && mouseIsPressed) {
      colorSelected = "white";
    }
    if (mouseY >= 271 && mouseY <= 290 && mouseIsPressed) {
      colorSelected = "black";
    }
  }
  // Could be better but I don't have much time
  // Depending on color, switches color to respective one.
  switch (colorSelected) {
    case "red":
      colorRed.draw();
      break;
    case "orange":
      colorOrange.draw();
      break;
    case "yellow":
      colorYellow.draw();
      break;
    case "green":
      colorGreen.draw();
      break;
    case "cyan":
      colorCyan.draw();
      break;
    case "blue":
      colorBlue.draw();
      break;
    case "magenta":
      colorMagenta.draw();
      break;
    case "brown":
      colorBrown.draw();
      break;
    case "white":
      colorWhite.draw();
      break;
    case "black":
      colorBlack.draw();
      break;
  }
}
// class for each color
class Color {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
  }
  setup() {
    // color picker square colors
    fill(this.color);
    square(this.x, this.y, this.size);
  }
  draw() {
    noStroke();
    if (mouseIsPressed) {
      // if mouse is pressed, draw based on mouse position.
      fill(this.color);
      circle(mouseX, mouseY, 10);
    }
  }
}
