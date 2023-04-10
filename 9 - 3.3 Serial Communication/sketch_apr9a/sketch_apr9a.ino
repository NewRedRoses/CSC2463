
unsigned long lastSent = 0;

void setup()
{
  Serial.begin(9600);
}
int fixedVal = 0;
void loop()
{

  int val = analogRead(A0);
  
  
  unsigned long now = millis();

 

  if (now-lastSent > 10)
  {
  Serial.println(val);
    
    lastSent = now;
  }
}