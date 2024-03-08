let deg = 0;
let eyeDeg = 0;
let speed = 1;
let speed2 = 2;

let scaleFactor = 1;

function setup() {
  let cnv = createCanvas(800, 400);
  cnv.parent("p5-canvas-container")
  noCursor();
}

function draw() {
  background(0, 70, 250);
  
  push();
  translate(200, 200);
  let rad = radians(deg);
  rotate( rad );
  scale(scaleFactor);
  
  
    // head
    circle(0,0, 90);
    
    
    // mouth
    fill(0);
    noStroke();
    arc(0,0,70, 85, 0, PI)
    
    // nose
    circle(-2, -10, 2);
    circle(2, -10, 2);
  
    //eyes
    fill(0);
    circle(-20, -20, 20);
    circle( 20, -20, 20);
    fill("yellow")
    
    push();
      translate(-20,-20);
      rotate( radians(eyeDeg) )
      rect(-8, -8, 16, 16);
  
      // helper dot to visualize nested origin
      // fill("blue"); 
      // circle(0, 0, 5);
    pop();
//     rotate( radians(295) )
//     rect(-28, -28, 16, 16);
    
    
  
//     // helper dot to visualize origin
    // fill("red");
    // circle(0, 0, 5);
  pop();
  // 
  
  deg+=speed;
  eyeDeg -= speed2;
  // scaleFactor+=0.001
  // speed*=1.001
}