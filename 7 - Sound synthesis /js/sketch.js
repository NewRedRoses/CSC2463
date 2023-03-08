// Mark Abrahams
// CSC 4562

let initTone = true;
let pitch = 600;

// Set up Tone
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.2,
  sustain: 1.0,
  release: 0.8,
}).connect(pan);
let img;

let noise = new Tone.Noise("pink").start();
let noiseEnv = new Tone.AmplitudeEnvelope({
  attack: 0.1,
  decay: 0.7,
  sustain: 1.0,
  release: 0.9,
}).connect(gain);

let noiseFilter = new Tone.Filter(1500, "lowpass").connect(noiseEnv);
noise.connect(noiseFilter);

let width = 400;
let height = 400;

let imageToggle = false;

function setup() {
  createCanvas(width, height);
  imageMode(CENTER);
  img = loadImage("cowboy.png");
}

function draw() {
  background(230, 126, 34);
  if (imageToggle) displayImage();

  if (!imageToggle) text("press the square to initialize audio!", 100, 100);
}

function displayImage() {
  img.resize(400, 400);
  image(img, width / 2, height / 2);
}
// mouse click turn photo on and play sound
function mousePressed() {
  triggerSound();
  console.log("Pressed");
  imageToggle = !imageToggle;
  Tone.start();
  initTone = false;
}

function triggerSound() {
  ampEnv.triggerAttackRelease("3n");
  noiseEnv.triggerAttackRelease(0.3);
}
