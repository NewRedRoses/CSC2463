// Mark Abrahams
//

let spriteSheet;
let walkingAnimation;

let spriteSheetFilenames = ["bug1.png", "bug2.png"];
let spriteSheets = [];
let deadSpriteSheets = [];
let animations = [];

let speedScaler = 1;

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver",
};

let game = {
  score: 0,
  maxScore: 0,
  maxTime: 30,
  elapsedTime: 0,
  totalSprites: 15,
  state: GameState.Start,
  targetSprite: 2,
};

// @TODO: display death animation after bug is clicked.

function preload() {
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  }
  for (let i = 0; i < spriteSheetFilenames.length; i++) {
    deadSpriteSheets[i] = loadImage(
      "assets/" + "dead" + spriteSheetFilenames[i]
    );
  }
}

function setup() {
  createCanvas(600, 600);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}

function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = random(10, 50);
  speedScaler = 1;

  animations = [];
  // Randomize the bug
  for (let i = 0; i < game.totalSprites; i++) {
    animations[i] = new WalkingAnimation(
      random(spriteSheets),
      80,
      80,
      random(100, 600),
      random(100, 600),
      4,
      random(1, 5),
      7,
      random([0, 1])
    );
  }
}

function draw() {
  // For the different modes the game can be in.
  switch (game.state) {
    case GameState.Playing:
      background(220);

      for (let i = 0; i < animations.length; i++) {
        animations[i].draw();
      }
      fill(0);
      textSize(40);
      text(game.score, 20, 40);
      let currentTime = game.maxTime - game.elapsedTime;
      text(ceil(currentTime), 300, 40);
      game.elapsedTime += deltaTime / 1000;

      if (currentTime < 0) game.state = GameState.GameOver;
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score, game.maxScore);

      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over!", 250, 200);
      textSize(35);
      text("Score: " + game.score, 250, 250);
      text("Max Score: " + game.maxScore, 250, 300);
      break;
    case GameState.Start:
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Squishy Game", 250, 200);
      textSize(30);
      text("Press Any Key to Start", 250, 300);
      break;
  }
}

function keyPressed() {
  switch (game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  switch (game.state) {
    case GameState.Playing:
      for (let i = 0; i < animations.length; i++) {
        let contains = animations[i].contains(mouseX, mouseY);
        if (contains) {
          // If bug gets hit / killed
          if (animations[i].moving != 0) {
            speedScaler += 0.15;
            animations[i].dead();
            animations[i].stop(i);
            // add 1 to score
            game.score += 1;
            // if bug's alive
          } else {
            if (animations[i].xDirection === 1) animations[i].moveRight();
            else animations[i].moveLeft();
          }
        }
      }
      break;
  }
}
// Class w/ properties for each bug
class WalkingAnimation {
  constructor(
    spritesheet,
    sw,
    sh,
    dx,
    dy,
    animationLength,
    speed,
    framerate,
    vertical = false,
    offsetX = 0,
    offsetY = 0
  ) {
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.speedScaler = this.speedScaler;
    this.speed = speed;
    this.framerate = framerate * speed;
    this.vertical = vertical;
  }

  draw() {
    // if (this.moving != 0)
    //   this.u = this.currentFrame % this.animationLength;
    // else
    //   this.u = 0;

    this.u =
      this.moving != 0 ? this.currentFrame % this.animationLength : this.u;
    push();
    translate(this.dx, this.dy);
    if (this.vertical == false) rotate(90);
    scale(this.xDirection, 1);

    // display bug to screen
    image(
      this.spritesheet,
      0,
      0,
      this.sw,
      this.sh,
      this.u * this.sw + this.offsetX,
      this.v * this.sh + this.offsetY,
      this.sw,
      this.sh
    );
    pop();
    let proportionalFramerate = round(frameRate() / this.framerate);
    if (frameCount % proportionalFramerate == 0) {
      this.currentFrame++;
    }

    if (this.vertical) {
      this.dy += this.moving * (this.speed * speedScaler);

      this.move(this.dy, this.sw / 4, height - this.sw / 4);
    } else {
      this.dx += this.moving * (this.speed * speedScaler);
      this.move(this.dx, this.sw / 4, width - this.sw / 4);
    }
  }

  move(position, lowerBounds, upperBounds) {
    if (position > upperBounds) {
      this.moveLeft();
    } else if (position < lowerBounds) {
      this.moveRight();
    }
  }

  moveRight() {
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
  }

  moveLeft() {
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
  }

  keyPressed(right, left) {
    if (keyCode === right) {
      this.currentFrame = 1;
    } else if (keyCode === left) {
      this.currentFrame = 1;
    }
  }

  keyReleased(right, left) {
    if (keyCode === right || keyCode === left) {
      this.moving = 0;
    }
  }

  contains(x, y) {
    //rect(-26,-35,50,70);
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
  }

  stop() {
    this.moving = 0;
    this.u = 8;
    this.v = 8;
  }
  speedUp() {
    this.speed += 0.25;
  }
  dead(bugID) {
    // Could not implement :^)
  }
}
