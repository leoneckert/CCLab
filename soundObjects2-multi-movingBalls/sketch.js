let movingBalls = [];
let numMovingBalls = 4;

let sObjects = [];

function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent("canvasContainer");
  

  // mb = new MovingBall(width/2, height/2);
  // sObject = new SoundObject(100, height/2);
  for(let i= 0; i < numMovingBalls; i++){
    movingBalls.push(new MovingBall(width/2, height/2))
  }

}

function draw() {
  background(0);

  // MOVING BALLS:
  for(let i = 0; i < movingBalls.length; i++){
    movingBalls[i].update();
    movingBalls[i].display();
  }

  // SOUND OBJECT:
  for(let i = 0; i < sObjects.length; i++){
    sObjects[i].checkCollision(movingBalls);
    

    sObjects[i].update();
    sObjects[i].display();
  }
  

  // console.log(sObject.freq)


  let fps = frameRate();
  fill(255)
  text(round(fps), 50, 50);
}

class SoundObject{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;

    this.freq = random(50, 500); 
    this.osc = new p5.Oscillator("sine");
    this.osc.freq(this.freq); 
    

    this.dia = map(this.freq, 50, 500, 90, 10); 
    this.playing = false;
    this.timeOfLastPlay = 0;
    this.duration = 100;
    this.touchedPreviously = false; // <------
  }
  update(){

    if(millis() > this.timeOfLastPlay + this.duration && this.playing == true){
      this.stopSound();
    }
  }
  display(){
    push();
    translate(this.x, this.y);

    stroke(255);
    let greyTone = map(this.osc.getAmp(), 0, 1, 0, 255)
    fill(  greyTone  )
    circle(0, 0, this.dia);

    pop();
  }
  playSound(){
    this.osc.start();
    this.osc.amp(1, 0.1);
    this.playing = true;
    this.timeOfLastPlay = millis();
  }
  stopSound(){
    this.osc.amp(0, 0.5);
    this.playing = false;
  }
  checkCollision(others){

    for(let i = 0; i < others.length; i++){
      // distance between this sound object and the moving ball
      let distance = dist(this.x, this.y, others[i].x, others[i].y);
      // if diustamce is smaller than own radius and moving bvall radius combined
      // then we collide!
      if(distance < this.dia/2 + others[i].dia/2 && this.playing == false && this.touchedPreviously == false){
        this.playSound();
        this.touchedPreviously = true;
      }
    }

    this.touchedPreviously = false;
    for(let i = 0; i < others.length; i++){
      let distance = dist(this.x, this.y, others[i].x, others[i].y);

      if(distance < this.dia/2 + others[i].dia/2){
        this.touchedPreviously = true;
      }
    }
    


  }

}

class MovingBall{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.speedX = 10//random(-8, 8);
    this.speedY = 10//random(-8, 8);
    this.dia = 100;

  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x > width-this.dia/2 || this.x < this.dia/2){
      this.speedX = -this.speedX;
    }

    if(this.y > height-this.dia/2 || this.y < this.dia/2){
      this.speedY = -this.speedY;
    }
  }
  display(){
    push();
    translate(this.x, this.y);

    circle(0, 0, this.dia);

    pop();
  }
}


function mousePressed(){
  sObjects.push( new SoundObject(mouseX, mouseY));
}

// function mouseReleased(){
//   sObject.stopSound();
// }
