import processing.sound.*;
Pulse pulse;

import processing.serial.*;

// The serial port:
Serial myPort;

int xpos=0;
float strain=0;
void setup() {
  size(640,640);
 // noStroke();
  background(255); 
  frameRate(20);
  pulse = new Pulse(this);
 // pulse.play();
  printArray(Serial.list());
  
  myPort = new Serial(this, "COM6", 57600);
 
}

void draw() {
  
  main_screen(strain);
  
   while (myPort.available() > 0) {
    String inBuffer = myPort.readString(); 
    
    strain = map(int_data,0,1000000,0,height);
    if (inBuffer != null) {
      println(inBuffer,"    ",strain, "    ", int_data);
    }
  }
  
  
  
}

void main_screen(float strain) {
   // fill(255, 204);
 xpos+=1;
   
 line(xpos, height, xpos, strain);
  //circle(millis()/10, mouseY , 2);
 // print(mouseX,"   ", mouseY,"\n");
  pulse.freq(height - (mouseY));
  
  
}
