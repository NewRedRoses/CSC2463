/*
 *  Mark Abrahams
 * CSC 2463
 */

let sounds = new Tone.Players({
  backgroundSounds: "sounds/ambientSound.wav",
  raining: "sounds/rainOnUmbrella.wav",
  frogs: "sounds/treeFrog.wav",
  walking: "sounds/walking.wav",
});

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["backgroundSounds", "raining", "frogs", "walking"];
let buttons = [];

let dSlider;
let fSlider;
let chorus;

function setup() {
  createCanvas(600, 600);
  sounds.connect(delay);
  delay.toDestination();

  // imageMode(CENTER);
  // soundNames.position(0, 0);
  let x = 100;
  // For every sound in the list do the following:
  soundNames.forEach((word, index) => {
    // Create a button with the title as the text
    buttons[index] = createButton(word);
    // Give it 50 padding for each element
    x += 50;
    // Move it evenly
    buttons[index].position(index + 100, x);
    // if pressed, play their perspective sound.
    buttons[index].mousePressed(() => buttonSound(word));
  });

  // chorus = new Tone.Chorus(4, 2.5, 0.5);
  // Create a slider to be used with the delay
  dSlider = createSlider(0, 0.5, 0.25, 0.1);
  dSlider.position(30, 550);
  dSlider.mouseReleased(() => {
    delay.delayTime.value = dSlider.value();
  });
  // Create a slider to be used with the feedback
  fSlider = createSlider(0, 0.5, 0.25, 0.05);
  fSlider.position(180, 550);
  fSlider.mouseReleased(() => {
    delay.feedback.value = fSlider.value();
  });
  // Create a button that clears the sound effects.
  clearBtn = createButton("Reset Effects");
  clearBtn.position(330, 550);
}

function draw() {
  background(22, 160, 133);

  // Text with color
  fill(236, 240, 241);
  text("Please press the buttons for a relaxing experience!", 90, 100);
  text("Delay slider", 60, 525);
  text("Feedback slider", 195, 525);

  // If pressed, reset the values.
  clearBtn.mousePressed(() => {
    fSlider.value(0);
    dSlider.value(0);
  });
}

// Function to play sound with the button pressed.
function buttonSound(whichSound) {
  sounds.player(whichSound).start();
}
function sliderValue(slider) {
  return slider.value();
}
