#include <Arduino_JSON.h>

const int numReadings = 10;

int xValue = 0; // To store value of the X axis
int yValue = 0; // To store value of the Y axis


//Xsmoothing
int xReadings[numReadings];
int readXIndex = 0;
int xTotal = 0;
int xAverage = 0;

//Ysmoothing
int yReadings[numReadings];
int readYIndex = 0;
int yTotal = 0;
int yAverage = 0;

int XOut = 0;
int YOut = 0;

const int X_pin = A0;
const int Y_pin = A1;
const int SW_pin = 2;

// delay setter
unsigned long previousMillis = 0;
const long interval = 20;


JSONVar serialOutput;

char *colors[] = {
    "red", "orange",
    "yellow", "green",
    "cyan", "blue",
    "magenta", "brown",
    "white", "black",
};
int num_colors = 4;
const int buttonPin = 7;
int buttonState = 0;
int clearButtonState = 0;
int colorSwitcher = 0;
int colorSize = 10;

const int clearButtonPin = 11;

void setup() {
  Serial.begin(9600) ;

  pinMode(SW_pin,INPUT);
  pinMode(buttonPin,OUTPUT);
  pinMode(clearButtonPin,OUTPUT);
  digitalWrite(SW_pin,HIGH);

}

void loop() {
unsigned long currentMillis = millis();

  // read analog X and Y analog values
  xValue = analogRead(X_pin);
  yValue = analogRead(Y_pin);

  buttonState = digitalRead(buttonPin);
  clearButtonState = digitalRead(clearButtonPin);

  XOut = map(xAverage,0,1023,0,255);
  YOut = map(yAverage,0,1023,0,255);

  if (currentMillis - previousMillis >= interval) {
        previousMillis = currentMillis;


       //subtract last X reading
    xTotal = xTotal - xReadings[readXIndex];
    //read from the sensor:
    xReadings[readXIndex] = analogRead(X_pin);
    //add the reading to the total:
    xTotal = xTotal + xReadings[readXIndex];
    //advance to next position in array:
    readXIndex = readXIndex + 1;

      //if at end of array
    if (readXIndex >= numReadings) {
      //... wrap to beginning
      readXIndex = 0;
    }

    xAverage = xTotal / numReadings;

 //subtract last Y reading
    yTotal = yTotal - yReadings[readYIndex];
    //read from the sensor:
    yReadings[readYIndex] = analogRead(Y_pin);
    //add the reading to the total:
    yTotal = yTotal + yReadings[readYIndex];
    //advance to next position in array:
    readYIndex = readYIndex + 1;

     //if at end of array
    if (readYIndex >= numReadings) {
      //... wrap to beginning
      readYIndex = 0;
    }

    yAverage = yTotal / numReadings;




      //create JSON definitions
    serialOutput["Switch"] = digitalRead(SW_pin);
    serialOutput["Xaxis"] = XOut;
    serialOutput["Yaxis"] = YOut;
    // for (int i = 0; i < num_colors; i++){
    //   serialOutput["Color"] = colors[i];
    // }
    if (buttonState == HIGH){
      colorSwitcher++;
    }
    else if (colorSwitcher > colorSize){
      colorSwitcher = 0;
    }
    else{
      serialOutput["Color"] = colors[colorSwitcher];
      // delay(200);
    }

    if (clearButtonState == HIGH){
      serialOutput["ClearAll"] = true;
    }
    else{
      serialOutput["ClearAll"] = false;
    }

     Serial.println(serialOutput);
    

  }
  // print data to Serial Monitor on Arduino IDE
  
  // Serial.print("X-axis: ");
  // Serial.print(analogRead(X_pin));
  // Serial.print("\n");

  // Serial.print("Y-axis: ");
  // Serial.print(analogRead(Y_pin));
  // Serial.print("\n\n");
  

}
