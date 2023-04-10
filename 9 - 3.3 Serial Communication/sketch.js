let port;
let writer;
let reader;
let str;
let color;
function setup() {
  createCanvas(400, 400);
// create port 
  port = createSerial();

  // If the port was used before, keep using it.
  // let usedPorts = usedSerialPorts();
  // if (usedPorts.length > 0) {
  //   port.open(usedPorts[0], 57600);
  // }
//  If in browser is that supports serial port reading
  if ("serial" in navigator) {
    // the web serial api is supported
    let button = createButton("Connect");
    button.position(0, 0);
    button.mousePressed(connect);
  }
}
// Function to connect arduino + port
function connect() {
  if (!port.opened()) {
    port.open("Arduino", 9600);
  } else {
    port.close();
  }
}

function draw() {
  // read info until it reaches the end
  let str = port.readUntil("\n");
  // turn value from string to integer to be used for color
  let newVal = int(str);
  // Declare the background color to color depencing on light level. 
  background(newVal);
  
// Output current light level to canvas
  if (str.length > 0) {
    text("Value: " + str, 10, height - 20);
    console.log(newVal);
  } 

  // if (writer) {
  //   writer.write(new Uint8Array([]))
  // }
}

/* 
Demonstrate Arduino and P5 communicating with one another. Write a P5 sketch that toggles a digital output connected to an Arduino on and off through keyboard or mouse interaction with a web page. For example a mouse click could turn the LED on and a second click could turn the LED off. 

Connect an analog input (photocell, potentiometer, etc) to the Arduino and use it to control something (perhaps the background color) of the same web page.

Upload a .ino file with your Arduino code in addition to a fully working website including your sketch.js, index.html, and p5.js library files. Include a YouTube video link showing your project working in the comments at the very top of this file. Additionally, put the YouTube link in the online text portion of Moodle when you upload.

*/
