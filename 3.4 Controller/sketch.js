//  Mark Abrahams
// CSC 2463
let connectButton;
let sliderLED;
let sliderBlue;
let red, green, blue;
let joySwitch;
let sensorData = {};
let mouseClicked = false;
let port;
// Audio / Synth setup
let synth = new Tone.PolySynth().connect(Tone.Master);
let dSynth = new Tone.PolySynth().connect(Tone.Master);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

let writer, reader;
let mappedX, mappedY;


const vol = new Tone.Volume(-12);

let pattern = new Tone.Pattern(
  function (time, note) {
    synth.triggerAttackRelease(note, 0.25, time);
  },
  ["C4", ["D4", "B3"], "E4", "G4"]
);

const melody = new Tone.Sequence(
  (time, note) => {
    synth.triggerAttackRelease(note, 0.1, time);
    // subdivisions are given as subarrays
  },
  ["C4", "C5", "C5", null, "D5", "E5", "E5", "E5", null]
).start("0:0");

let chords = [
  { time: "0:0", note: ["C4", "E3", "G4"] },
  { time: "0:2", note: ["F4", "A4", "C4"] },
  { time: "1:3", note: ["G4", "B3", "D4"] },
  { time: "1:2", note: ["G4", "B3", "F4"] },
];

let chord = new Tone.Part((time, notes) => {
  dSynth.triggerAttackRelease(notes.note, "2n", time);
}, chords);

chord.loop = 4;
chord.loopEnd = "2m";

const synthA = new Tone.FMSynth().toDestination();
const synthB = new Tone.AMSynth().toDestination();
//play a note every quarter-note
const loopA = new Tone.Loop((time) => {
  synthA.triggerAttackRelease("C2", "6n", time);
}, "4n").start(0);
//play another note every off quarter-note, by starting it "8n"
const loopB = new Tone.Loop((time) => {
  synthB.triggerAttackRelease("C4", "8n", time);
}, "4n").start("8n");

//-------------------------------------------------------------------
const now = Tone.now();

let colorNote;



// Effects
const chorus = new Tone.Chorus(4, 2.5, 0.5).toDestination();

function setup() {
  createCanvas(800, 700);

  port = createSerial();

  // Synth's Volume
  synthA.volume.value = -15;
  synthB.volume.value = -15;
  synth.volume.value = -5;
  dSynth.volume.value = -10;



  colorInstanceCreator();
  colorSetup();

  clearBtn = createButton("Erase all");
  clearBtn.position(730, 700);
  clearBtn.mousePressed(clearBtnFunction);

  muteBtn = createButton("Mute / Unmute");
  muteBtn.position(620, 700);
  muteBtn.mousePressed(() => (Tone.Master.mute = !Tone.Master.mute));

  connectBtn = createButton("Connect to serial");
  connectBtn.position(80, 700);
  connectBtn.mousePressed(connect);
}

// works like default color
let colorSelected = "black";

// function mousePressed() {
//   mouseClicked = true;
// }

function colorInstanceCreator() {
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
}

async function connect() {
  port = await navigator.serial.requestPort();

  await port.open({ baudRate: 9600 });

  writer = port.writable.getWriter();

  reader = port.readable
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(new TransformStream(new LineBreakTransformer()))
    .getReader();
}

class LineBreakTransformer {
  constructor() {
    // A container for holding stream data until a new line.
    this.chunks = "";
  }

  transform(chunk, controller) {
    // Append new chunks to existing chunks.
    this.chunks += chunk;
    // For each line breaks in chunks, send the parsed lines out.
    const lines = this.chunks.split("\n");
    this.chunks = lines.pop();
    lines.forEach((line) => controller.enqueue(line));
  }

  flush(controller) {
    // When the stream is closed, flush any remaining chunks out.
    controller.enqueue(this.chunks);
  }
}

function clearBtnFunction() {
  mouseClicked = false;
  synth.triggerAttackRelease("C6", "8n");
  background(250);
  colorSetup();

  // Tone.Master.mute = !Tone.Master.mute;
}

function mousePressed() {
  synth.triggerAttackRelease(colorNote, now);
}

function playAudio() {
  // Audio initializer
  Tone.start();
  chord.start("0:0");
  pattern.start(0);
  Tone.Transport.start();
}

function colorSetup() {
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

function draw() {
  // background(250);

  // text("Volume", Tone.Master.volume, 80);
  if (reader) {
    serialRead();
  }
  push();
  fill(String(sensorData.Color));
  square(10, 600, 30);
  pop();

  beginLayer();
  
  // noFill();
  // fill('blue');
  circle(
    map(sensorData.Xaxis, 0, 255, 0, 700),
    map(sensorData.Yaxis, 0, 255, 0, 700),
    10
  );
  clear();

  endLayer();

   mappedX = map(sensorData.Xaxis, 0, 255, 0, 800);
  mappedY = map(sensorData.Yaxis, 0, 255, 0, 700);
  
  if (sensorData.ClearAll) {
    clearBtnFunction();
  }
  // // p5 layer stuff for cursor
  // beginLayer(800, 700);


  // endLayer();
  // background(200);
  // If mouse is pressed within a given axis
  // Play a sound and select the color ID.
  if (mouseX >= 0 && mouseX <= 30) {
    if (mouseY >= 0 && mouseY <= 29 && mouseIsPressed) {
      synth.triggerAttackRelease("C3", "8n");
      colorNote = "C3";
      colorSelected = "red";
    }
    if (mouseY >= 31 && mouseY <= 59 && mouseIsPressed) {
      synth.triggerAttackRelease("E3", "8n");
      colorNote = "E3";
      colorSelected = "orange";
    }
    if (mouseY >= 60 && mouseY <= 89 && mouseIsPressed) {
      synth.triggerAttackRelease("F3", "8n");
      colorNote = "F3";
      colorSelected = "yellow";
    }
    if (mouseY >= 90 && mouseY <= 119 && mouseIsPressed) {
      synth.triggerAttackRelease("G3", "8n");
      colorNote = "G3";
      colorSelected = "green";
    }
    if (mouseY >= 120 && mouseY <= 149 && mouseIsPressed) {
      synth.triggerAttackRelease("A3", "8n");
      colorNote = "A3";
      colorSelected = "cyan";
    }
    if (mouseY >= 150 && mouseY <= 189 && mouseIsPressed) {
      synth.triggerAttackRelease("B3", "8n");
      colorNote = "B3";
      colorSelected = "blue";
    }
    if (mouseY >= 190 && mouseY <= 210 && mouseIsPressed) {
      synth.triggerAttackRelease("C2", "8n");
      colorNote = "C2";
      colorSelected = "magenta";
    }
    if (mouseY >= 211 && mouseY <= 240 && mouseIsPressed) {
      synth.triggerAttackRelease("E2", "8n");
      colorNote = "E2";
      colorSelected = "brown";
    }
    if (mouseY >= 241 && mouseY <= 270 && mouseIsPressed) {
      synth.triggerAttackRelease("F2", "8n");
      colorNote = "F2";
      colorSelected = "white";
    }
    if (mouseY >= 271 && mouseY <= 290 && mouseIsPressed) {
      synth.triggerAttackRelease("A2", "8n");
      colorNote = "A2";
      colorSelected = "black";
    }
  }
  // Could be better but I don't have much time
  // Depending on color, switches color to respective one.
  switch (sensorData.Color) {
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

async function serialRead() {
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    //  console.log(value);
    sensorData = JSON.parse(value);
    console.log(sensorData);
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
    // square(this.x, this.y, this.size);
  }
  draw() {
    noStroke();
    if (sensorData.Switch == false) {
      // rectMode(CENTER);
      playAudio();
      // if mouse is pressed, draw based on mouse position.
      fill(this.color);
      circle(mappedX, mappedY, 10);
    }
  }
}
