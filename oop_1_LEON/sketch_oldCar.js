let angle = 30;

let bigTaxiX = 200;
let bigTaxiSpeed = 1;

let smallTaxiX = 300;
let smallTaxiSpeed = 2.5;

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer");
}

function draw() {
  background(90, 120, 250);
  
  // "floor"
  stroke(0);
  line(0, height/2, width, height/2);
  
  drawTaxi(bigTaxiX, height/2, 1);
  drawTaxi(smallTaxiX, height/2, 0.5);
  
  angle+=2;
  
  // make small taxi move
  smallTaxiX+=smallTaxiSpeed
  if(smallTaxiX > width+100){
    smallTaxiX = -100;
  }

  // make big taxi move
  bigTaxiX+=bigTaxiSpeed
  if(bigTaxiX > width+100){
    bigTaxiX = -100;
  }
}

function drawTaxi(x, y, s){ 
  push();
  translate(x, y);
  scale(s);

    noStroke();
    fill(240, 220, 60);

    // base:
    rect(-50, -50, 100, 30);
    // top"
    rect(-25, -70, 50, 20);
    // wheel 1:
    drawWheel(-30, -15);
    // wheel 2:
    drawWheel( 30, -15);

    fill("red")
    circle(0, 0, 5)
  
  pop(); 
  
}

function drawWheel(x, y){
  push();
  translate(x, y);
  rotate( radians(angle) );
  
    noStroke();
    fill(0);
    // circle(0,0,30);
    ellipse(0, 0, 28, 32)
  
  pop();
}
