// variable to hold on instance of the taxi class
// the "dough"
let instanceOfTaxi;
let instanceOfTaxi2;


let chop;

function preload(){
  chop = loadSound("sounds/chop.m4a")
}

function setup() {
  let cnv = createCanvas(400, 400);
  cnv.parent("canvasContainer");

  // make one instance of the class
  instanceOfTaxi = new Taxi(50, 200, 1);
  instanceOfTaxi2 = new Taxi(200, 200, 0.5);
}

function draw() {
  background(90, 120, 250);
  
  // face
  circle(200, 160, 80);
  circle(180, 150, 10);
  circle(220, 150, 10);
  line(170, 180, 230, 180);

  instanceOfTaxi.update();
  instanceOfTaxi.display();

  instanceOfTaxi2.update();
  instanceOfTaxi2.display();

}

class Taxi{
  constructor(startX, startY, s){
    this.x = startX;
    this.y = startY;
    this.s = s; // scale
    this.speedX = random(-2, 2);
    this.playedSound = false;
  }
  update(){
    this.x += this.speedX;

    if(this.x > width + (50)){
      this.x = 0 - (50);
      this.playedSound = false;
    }else if(this.x < 0 - (50)){
      this.x = width + (50);
      this.playedSound = false;
    }

    if(this.speedX > 0 && this.x > width/2 && this.playedSound == false){
      chop.play();
      this.playedSound = true;
    }else if(this.speedX < 0 && this.x < width/2 && this.playedSound == false){
      chop.play();
      this.playedSound = true;
    }
    
  }
  display(){
    push();
    translate(this.x, this.y);
    scale(this.s)

    // base:
    rect(-50, -50, 100, 30);
    // top"
    rect(-25, -70, 50, 20);
    // wheel 1:
    //           wheelX, wheelY
    this.drawWheel(-30, -15);
    // wheel 2:
    //           wheelX, wheelY
    this.drawWheel( 30, -15);

    
    fill("red");
    circle(0, 0, 5 )
    pop();
  }
  
  drawWheel(wheelX, wheelY){
    push();
    translate(wheelX, wheelY);
    // rotate( radians(angle) );
    
      noStroke();
      fill(0);
      // circle(0,0,30);
      ellipse(0, 0, 28, 32)
    
    pop();
  }
  

}