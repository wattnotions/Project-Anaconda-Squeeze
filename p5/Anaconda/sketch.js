/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle




let x, y;
let dx=1;
y_margin = 80; //margin for plot lines from side
x_margin = 80;


function setup() {
  createCanvas(windowWidth, windowHeight);
 
  canvas2 = createGraphics(windowWidth, windowHeight);
  canvas2.clear()
  
  // Starts in the middle
  x=x_margin;
  y = height/2;
  background('white');
  
  fr = 20;
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
  
  
  
  
}

function draw() {
  background('white');
  
  
  
   
  
  
  
  
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
 
  //This section prints the overlay stuff to screen (refresh)
  textAlign(LEFT, LEFT);
  fill(255,150)
  noStroke()
  textSize(32);
  fill(0, 102, 153);
  text("Current Pressure Level :" +y, 10, 30);
  
 
  
 
  //This part draws the line that has persistence between frames
  canvas2.stroke(5);
  canvas2.fill(100);
  canvas2. ellipse(x, y, 2, 2);
  canvas2.line(x_margin,y_margin, x_margin,windowHeight-y_margin); //draw y axis
  canvas2.line(x_margin,windowHeight-y_margin, windowWidth-x_margin,windowHeight-y_margin); //draw x axis
  
  
  canvas2.textSize(32);
  canvas2.textAlign(CENTER, CENTER);
  canvas2.text("Time", windowWidth/2, windowHeight-y_margin/2);
  
  canvas2.angleMode(DEGREES)
  //canvas2.rotate(1);
 
	canvas2.push()
	canvas2.textAlign(CENTER, CENTER);
   canvas2.translate(x_margin/2, windowHeight/2)
   canvas2.rotate(270);
   canvas2.text("GeeksForGeeks", 0, 0); 
   //canvas2.rotate(90); 
   canvas2.textSize(30); 
  
  // canvas2.text("GeeksForGeeks", windowHeight/2, -y_margin/2); 
  //canvas2.rotate(-1);
   canvas2.pop()
  
  
  // Moving up at a constant speed
  x = x+dx;
  
  
  
  // Reset to the bottom
  if (x > width) {
    x=0;
	background(200);
	
  }
  
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

