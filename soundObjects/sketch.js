let soundObjects = [];
let picker;
function setup() {
  let canvas = createCanvas(windowWidth, 400);
  canvas.parent("canvasContainer");
  background(220);

  so = new SoundObject(width/2, height/2);
  picker = new Picker(width/2, height/2)
}

function draw() {
  background(0)
  //
  
  if(mouseIsPressed && keyIsPressed){
    soundObjects.push(new SoundObject(mouseX, mouseY))
  }


  picker.update();
  picker.display();

  for(let i = 0; i < soundObjects.length; i++){
    soundObjects[i].update();
    soundObjects[i].checkCollision(picker);
    soundObjects[i].display();
  }
}

class SoundObject{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    // this.freq = random([100, 200, 300, 400, 500]);
    this.freq = random(80, 900);
    // this.freq = map(this.y, 0, height, 80, 900);

    this.pan = map(this.x, 0, width, 1, -1);

    
    this.dia = map(this.freq, 80, 900, 100, 5);

    this.osc = new p5.Oscillator('sin');
    this.osc.freq(this.freq);
    this.osc.pan(this.pan);
    // this.osc.amp(0);
    this.playing = false;

    this.activated = 0;
    this.duration = random(10, 20);

    this.prevIn == false

  }
  update(){
    console.log(this.osc.getAmp())
    if (this.playing) {
      // smooth the transitions by 0.1 seconds
      this.osc.amp(1, 0.2);
    }

    if(millis()>this.activated+this.duration && this.playing == true ){
      this.stopPlaying();
    }
  }
  display(){
    push();
    translate(this.x, this.y);

    stroke(255);
    fill(map(this.osc.getAmp(), 0, 1, 255, 0))
    circle(0,0, this.dia)
    pop();
  }

  playOscillator() {
    // starting an oscillator on a user gesture will enable audio
    // in browsers that have a strict autoplay policy.
    // See also: userStartAudio();
    this.playing = true;
    this.osc.start();
    this.activated = millis();
  }
  stopPlaying(){
    this.osc.amp(0, 0.5);
    this.playing = false;
  }
  checkCollision(other){
    let distance = dist(this.x, this.y, other.x, other.y);
    if(distance < this.dia/2 + other.dia/2 && this.playing == false && this.prevIn == false){
      this.playOscillator();
      console.log("play")
      this.prevIn = true;
    }
    
    if(distance > this.dia/2 + other.dia/2){
      this.prevIn = false;
    }
  }

}


function mousePressed(){
  // so.playOscillator()
  soundObjects.push(new SoundObject(mouseX, mouseY))

}
// function mouseReleased(){
//   so.stopPlaying()
// }


class Picker{
  constructor(startX, startY){
    this.x = startX;
    this.y = startY;
    this.speedX = random([-7, 7]);
    this.speedY = random(-4, 4);
    this.dia = 130;

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

    circle(0, 0, this.dia)

    pop();
  }
}