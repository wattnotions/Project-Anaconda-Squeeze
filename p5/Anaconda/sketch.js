/*
 * @name Animation
 * @description The circle moves.
 */
// Where is the circle




let x, y;




function setup() {
  createCanvas(windowWidth, windowHeight);
  canvas2 = createGraphics(windowWidth, windowHeight);
  canvas2.clear()
  
  // Starts in the middle
  x = width / 2;
  y = height/2;
  background(200);
  
}

function draw() {
  background(200);
   
  
  
  
  
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
 
  fill(255,150)
  noStroke()
  textSize(32);
  fill(0, 102, 153);
  text(y, 10, 30);
 
  
 
  canvas2.stroke(5);
  canvas2.fill(100);
  canvas2. ellipse(x, y, 2, 2);
  
  
  // Moving up at a constant speed
  x = x+1;
  
  // Reset to the bottom
  if (x > width) {
    x=0;
	background(200);
  }
  
  image(canvas2, 0, 0);
  
  
}



function windowResized() {
   resizeCanvas(displayWidth, windowHeight);
   background(200);
   y = height/2;
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }


}

