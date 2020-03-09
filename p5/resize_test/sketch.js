var canvas;

function setup() {
  canvas = createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(51);
  ellipse(width/2,height/2,width/2,height/2);
}

window.onresize = function() {
  canvas.size(windowWidth, windowHeight);
};