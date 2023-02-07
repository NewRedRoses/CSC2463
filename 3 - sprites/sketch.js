// Mark R. abrahams
// CSC 2463

let spriteSheet;
let girlSpriteSheet;
// sprite x, y, width and height
let sx = 0;
let sy = 0;
let sw = 80;
let sh = 80;

let u = 0;
let v = 0;

let currentFrame = 0;

let x = 200;
let moving = 0;
let xDirection = 1;

let guySprite;
let girlSprite;

function preload() {
  spriteSheet = loadImage("assets/sprite1.png");
  girlSpriteSheet = loadImage("assets/sprite2.png");
}
function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);

  guySprite = new WalkingAnimation(spriteSheet, 80, 80, 200, 200, 9);
  girlSprite = new WalkingAnimation(girlSpriteSheet, 80, 80, 300, 100, 9);
}

function draw() {
  background(220);

  guySprite.draw();
  girlSprite.draw();
}
function keyPressed() {
  guySprite.keyPressed();
  girlSprite.keyPressed();
}
// if key is released
function keyReleased() {
  guySprite.keyReleased();
  girlSprite.keyReleased();
}
// In order to make the sprite animation more dynamic with sizes -> able to upload any sprite
class WalkingAnimation {
  constructor(spriteSheet, sw, sh, dx, dy, animationLength) {
    this.spriteSheet = spriteSheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }
  draw() {
    // if moving, animate, otherwise display frame 0 (standing)
    if (this.moving != 0) {
      // this.u = this.currentFrame % this.animationLength;
      this.u = this.currentFrame % this.animationLength;
    } else {
      this.u = 0;
    }
    // Push & Pop are needed to "reset" movement.
    push();
    translate(this.dx, this.dy);
    scale(this.xDirection, 1);
    // each sprite is 80x80
    image(
      this.spriteSheet,
      0,
      0,
      this.sw,
      this.sh,
      this.u * this.sw,
      this.v * this.sh,
      this.sw,
      this.sh
    );
    pop();
    // // update every 4 frames
    if (frameCount % 4 == 0) this.currentFrame++;

    this.dx += this.moving;
  }
  // moving the character
  keyPressed() {
    // keycode -> initially pressed
    //
    if (keyCode === RIGHT_ARROW) {
      this.moving = 1;

      this.xDirection = 1;
      this.currentFrame = 1;
    }
    if (keyCode === LEFT_ARROW) {
      this.moving = -1;
      // for going left
      this.xDirection = -1;
      this.currentFrame = 1;
    }
  }
  keyReleased() {
    if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) {
      this.moving = 0;
    }
  }
}
