// Rotary Encoder Inputs
#define CLK 2
#define DT 3
#define SW 4
#define BTN1 5
#define BTN2 6
#define BTN3 7
#define BTN4 8
#define LRed 10
#define LGrn 11
#define LYlw 12
#define LBlu 13

int counter = 0;
int currentStateCLK;
int lastStateCLK;
String currentDir ="";
unsigned long lastButtonPress = 0;

void setup() {
  
  // Set encoder pins as inputs
  pinMode(CLK,INPUT);
  pinMode(DT,INPUT);
  pinMode(SW, INPUT_PULLUP);
  pinMode(BTN1,INPUT_PULLUP);
  pinMode(BTN2,INPUT_PULLUP);
  pinMode(BTN3,INPUT_PULLUP);
  pinMode(BTN4,INPUT_PULLUP);
  pinMode(LRed,OUTPUT);
  pinMode(LGrn,OUTPUT);
  pinMode(LYlw,OUTPUT);
  pinMode(LBlu,OUTPUT);
  offLed(LRed);
  offLed(LGrn);
  offLed(LYlw);
  offLed(LBlu);

  // Setup Serial Monitor
  Serial.begin(9600);

  // Read the initial state of CLK
  lastStateCLK = digitalRead(CLK);
}

void loop() {
  
  DialRead();
  if(ButtonCheck(BTN1))
  {
    toggleLed(LRed);
  }
  ButtonCheck(BTN2);
  ButtonCheck(BTN3);
  ButtonCheck(BTN4);
  ButtonCheck(SW);
 
  
  



  // Put in a slight delay to help debounce the reading
  delay(1);
}

void onLed(int pin)
{
  digitalWrite(pin,HIGH);
}
void offLed(int pin)
{
  digitalWrite(pin,LOW);
}

void toggleLed(int pin)
{
  digitalWrite(pin,!digitalRead(pin));
}

bool ButtonCheck(int pin)
{
  bool ret = false;
  if (digitalRead(pin) == LOW) 
  {
    
    if (millis() - lastButtonPress > 50) {
      Serial.print("Button pressed! ");
      Serial.println(pin);
      ret = true;
    }

    // Remember last button press event
     lastButtonPress = millis();

  }


  return ret;
  
}

int DialRead()
{
 
    // Read the current state of CLK
  currentStateCLK = digitalRead(CLK);

  // If last and current state of CLK are different, then pulse occurred
  // React to only 1 state change to avoid double count
  if (currentStateCLK != lastStateCLK  && currentStateCLK == 1){

    // If the DT state is different than the CLK state then
    // the encoder is rotating CCW so decrement
    if (digitalRead(DT) != currentStateCLK) {
      lastStateCLK = currentStateCLK;
      Serial.println("CCW");
      counter--;
      return -1;
      
      
    } else {
      //rotate cw
      lastStateCLK = currentStateCLK;
      Serial.println("CW");
      counter++;
      return 1;
    }

  }

 
  // Remember last CLK state
  lastStateCLK = currentStateCLK;
  return 0;
  
}
