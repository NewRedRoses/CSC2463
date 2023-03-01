const reverb = new Tone.Reverb();
const synth = new Tone.PolySynth().connect(reverb);

let currentKey = "";
const fontsize = 30;

let octaveUpBtn;
let octaveDownBtn;

// List of keys from
let notes = {
  a: "C3",
  s: "D3",
  d: "E3",
  f: "F3",
  g: "G3",
  h: "A3",
  j: "B3",
  k: "C3",
};

function setup() {
  createCanvas(400, 400);

  synth.toDestination();
  reverb.toDestination();

  // Font customization
  textAlign(CENTER, CENTER);
  textSize(fontsize);

  //Slider customization
  pitchSlider = createSlider(0, 1000, 0, 250);
  pitchSlider.position(120, 300);
}

function draw() {
  background(116, 185, 255);
  fill(223, 230, 233);

  text("Current Key:", 180, 150);
  text(currentKey, 180, 190);

  text("Detune value", 190, 340);
  synth.set({ detune: pitchSlider.value() });
}

function keyPressed() {
  let whatNote = notes[key];
  currentKey = whatNote;

  console.log(whatNote);
  synth.triggerAttackRelease(whatNote, "4n");
}
