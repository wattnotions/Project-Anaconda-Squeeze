/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle




let x, y;
let dx=1;
y_margin = 80; //margin for plot lines from side
x_margin = 80;
// Declare a "SerialPort" object
let serial;
//let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas


prev_val = 0;
prev_val_2 = 0;
x=0;
old_x=0;
old_y = 0;

arduino_port = "/dev/ttyACM0";

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  canvas2 = createGraphics(windowWidth, windowHeight);
  canvas2.clear()
  
  // Starts in the middle
  x=x_margin;
  y = windowHeight-y_margin;
  
  old_x = x;
  old_y = y;
  background('white');
  
  fr = 15;
  frameRate(fr);
  
  pix_per_frame = windowWidth/60;
  dx = pix_per_frame/fr;
  
  latest_val = 0;
  
  //osc = new p5.TriOsc();
  // Start silent
  //osc.start();
  //osc.amp(0);
  
 // playNote(60,500);
  //playNote(70,500);
  //playNote(80,500);
  
  line(x_margin,y_margin, x_margin,windowHeight-10);
  
  
  //Serial port setup
  
  serial = new p5.SerialPort();

  //serial.list();
  serial.open(arduino_port);
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
 // serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
  
  
  
  
}

new_data = false;

function draw() {
	background('white');
	
	
	
	

	displayPressure(latest_val)




	//This part draws the line that has persistence between frames
	canvas2.stroke(5);
	canvas2.fill(100);
	
	
	drawAxes()


	// Moving up at a constant speed
	//old_x = x;
	



	// Reset to the bottom
	
	
	
	//old_x = lerp(old_x, x, 0.001);
	//prev_val = lerp(prev_val, latestData, 0.1);
	//console.log(latestData);
	//sm_y = lerp(100, y, 0.01);
	
	//print("prev " + prev_val);
	//print("latest " + latestData);
	//print(serial.readLine());
	
	
	x++;
	//print("x = " + x);
	//print("old_x = " + old_x);
	//print("\n");
	
	new_data = newSerialData();
	print(new_data);
	if (new_data != false){
		//canvas2.line(old_x, prev_val_2, x, prev_val);
		
		//print("y = " + y);
		//print("old_y = " + old_y);
		//print("\n");
		
		
		old_y = y;
		//y = -new_data;
		
		y = new_data/2; //0-1024, scale to 0-512
		latest_val = new_data;
		
		y = windowHeight - y;
		//canvas2.ellipse(x,y,6);
		
		
		old_x = x;
		
		print(new_data);
		
	}
	//print(int(old_x) + "  " + x + "  " + old_y + "  " + y);
	old_x2 = old_x;
	old_y2 = old_y;
	
	old_x = lerp(old_x, x, 0.3);
	old_y = lerp(old_y, y, 0.3);
	//push()
	//canvas2.translate(x_margin, windowHeight-y_margin);
	
	if(x < windowWidth-x_margin){
		canvas2.line(old_x2, old_y2, old_x, old_y);
	}
	
	//pop()
	//canvas2.ellipse(old_x, old_y,6);
	
	//if (x < windowWidth-x_margin){
		//canvas2.ellipse(x,prev_val, 2);
//	}
	image(canvas2, 0, 0);


}

function formatYPoint(){    //formats the y vals to fit in graph area

}

function newSerialData(){
	
  let currentString = serial.readLine();  // read the incoming string
  let latestData="";
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return false;             // if the string is empty, do no more
  //console.log(currentString);             // print the string
  
  
  //old_x = x;
 // x = x+dx;
 // prev_val_2 = prev_val;
  //prev_val = latestData;
  //print("prev val = " + prev_val);
  latestData = int(currentString);            // save it for the draw method
  //print("new val = " + latestData);
  
  return latestData
	
	
}

function drawAxes(){
	
	canvas2.line(x_margin,y_margin, x_margin,windowHeight-y_margin); //draw y axis
	canvas2.line(x_margin,windowHeight-y_margin, windowWidth-x_margin,windowHeight-y_margin); //draw x axis


	canvas2.textSize(32);
	canvas2.textAlign(CENTER);
	canvas2.text("Time", windowWidth/2, windowHeight-y_margin/2);

	canvas2.angleMode(DEGREES)


	canvas2.push()

	canvas2.textAlign(CENTER);
	canvas2.translate(x_margin/2, windowHeight/2)
	canvas2.rotate(270);
	canvas2.text("Pressure", 0, 0); 
	canvas2.textSize(30); 

	canvas2.pop()
	
}

function displayPressure(y){
	//This section prints the overlay stuff to screen (refresh)
	textAlign(LEFT);
	fill(255,150)
	noStroke()
	textSize(32);
	fill(0, 102, 153);
	text("Current Pressure Level :" +int(y), 10, 30);
}



function windowResized() {
   resizeCanvas(windowWidth, windowHeight);
   
   background(200);
   y = height/2;
   setup();
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    setup()
  }


}

function playNote(note, duration) {
  osc.freq(midiToFreq(note));
  // Fade it in
  osc.fade(0.5,0.2);

  // If we sest a duration, fade it out
  if (duration) {
    setTimeout(function() {
      osc.fade(0,0.2);
    }, duration-50);
  }
}

// We are connected and ready to go
function serverConnected() {
  print("Connected to Server");
}

// Got the list of ports
function gotList(thelist) {
  print("List of Serial Ports:");
  // theList is an array of their names
  for (let i = 0; i < thelist.length; i++) {
    // Display in the console
    print(i + " " + thelist[i]);
  }
}

// Connected to our serial device
function gotOpen() {
  print("Serial Port is Open");
}

function gotClose(){
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

// Ut oh, here is an error, let's log it
function gotError(theerror) {
  print(theerror);
}

// There is data available to work with from the serial port
function gotData() {
  let currentString = serial.readLine();  // read the incoming string
  trim(currentString);                    // remove any trailing whitespace
  if (!currentString) return false;             // if the string is empty, do no more
  //console.log(currentString);             // print the string
  
  
  //old_x = x;
 // x = x+dx;
  prev_val_2 = prev_val;
  //prev_val = latestData;
  //print("prev val = " + prev_val);
  //latestData = int(currentString);            // save it for the draw method
  //print("new val = " + latestData);
  
  return latestData
}

// We got raw from the serial port
function gotRawData(thedata) {
  print("gotRawData" + thedata);
}

// Methods available
// serial.read() returns a single byte of data (first in the buffer)
// serial.readChar() returns a single char 'A', 'a'
// serial.readBytes() returns all of the data available as an array of bytes
// serial.readBytesUntil('\n') returns all of the data available until a '\n' (line break) is encountered
// serial.readString() retunrs all of the data available as a string
// serial.readStringUntil('\n') returns all of the data available as a string until a specific string is encountered
// serial.readLine() calls readStringUntil with "\r\n" typical linebreak carriage return combination
// serial.last() returns the last byte of data from the buffer
// serial.lastChar() returns the last byte of data from the buffer as a char
// serial.clear() clears the underlying serial buffer
// serial.available() returns the number of bytes available in the buffer
// serial.write(somevar) writes out the value of somevar to the serial device



