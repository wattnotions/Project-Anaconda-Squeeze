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
let latestData = "waiting for data";  // you'll use this to write incoming data to the canvas

function setup() {
  createCanvas(windowWidth, windowHeight);
 
  canvas2 = createGraphics(windowWidth, windowHeight);
  canvas2.clear()
  
  // Starts in the middle
  x=x_margin;
  y = height/2;
  background('white');
  
  fr = 60;
  frameRate(fr);
  
  pix_per_frame = windowWidth/60;
  dx = pix_per_frame/fr;
  
  osc = new p5.TriOsc();
  // Start silent
  osc.start();
  osc.amp(0);
  
 // playNote(60,500);
  //playNote(70,500);
  //playNote(80,500);
  
  line(x_margin,y_margin, x_margin,windowHeight-10);
  
  
  //Serial port setup
  
  serial = new p5.SerialPort();

  serial.list();
  serial.open("COM5");
  serial.on('connected', serverConnected);
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.on('error', gotError);
  serial.on('open', gotOpen);
  serial.on('close', gotClose);
  
  
  
  
}

function draw() {
	background('white');





	


	if (keyIsDown(UP_ARROW)) {
		y -= 5;
	}
	if (keyIsDown(DOWN_ARROW)) {
		y += 5;
	}
	
	old_y = y;
	y = int(latestData);
	
	print("y = " +y);
	print("old_y = "+old_y);
	
	
	//y = lerp(old_y, new_y, 0.1)
	

	//This section prints the overlay stuff to screen (refresh)
	textAlign(LEFT);
	fill(255,150)
	noStroke()
	textSize(32);
	fill(0, 102, 153);
	text("Current Pressure Level :" +y, 10, 30);




	//This part draws the line that has persistence between frames
	canvas2.stroke(5);
	canvas2.fill(100);
	//canvas2. ellipse(x, y, 2, 2);
	
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


	// Moving up at a constant speed
	old_x = x;
	x = x+dx;



	// Reset to the bottom
	if (x > width) {
		x=0;
		background(200);

	}
	
	
//	sm_x = lerp(old_x, x, 0.01);
	//sm_y = lerp(100, y, 0.01);
//	canvas2.line(old_x, old_y,sm_x,sm_y);
	image(canvas2, 0, 0);


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
  if (!currentString) return;             // if the string is empty, do no more
  console.log(currentString);             // print the string
  latestData = currentString;            // save it for the draw method
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



