let faces = [];
let numFaces = 4;
function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  for (let i = 0; i < numFaces; i++) {
    faces.push(new Face(random(width), random(height)));
  }
}
function draw() {
  background(180);
  for (let i = 0; i < faces.length; i++) {
    faces[i].update();
    // faces[i].checkIfScared(); // makes them speed up when mouse is over them
    faces[i].display(); 

  }


  // turn everybody angry at certain time:
  
  // if(frameCount > 60){
  // if(millis() > 3000){   // 3 seconds (3000 millieconds)
  //   for (let i = 0; i < faces.length; i++) {
  //     faces[i].turnAngry();
  //   }
  // }

  for(let i = faces.length-1; i >=0; i--){
    if(faces[i].alive == false){
      faces.splice(i, 1);
    }
  }



}


class Face {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.offsetX = 0;


    this.normalColor = color(220, 250, 90); //yellow 
    this.angryColor = color(255, 90, 29); // red  
    this.c = this.normalColor;  

    this.oscillationOffset = random(2*PI)
    this.speedFactor = random(0.01, 0.05);

    this.frameAtBirth = frameCount;  // <-------------------
    this.age = 0;  // <-------------------
    // this.ageToTurnAngry = int(random(300, 600)); // 400.424123412

    this.dia = 50;

    this.alive = true; 


  } 
  update() {
    this.offsetX = map(sin((frameCount+this.oscillationOffset) * this.speedFactor), -1, 1, -20, 20);
    this.age = frameCount - this.frameAtBirth;  // <-------------------
    
    // turn angry at specific age:
    // if(this.age >  400){
    //   this.turnAngry();
    // }


  }
  display() {
    push();
    translate(this.x + this.offsetX, this.y);
    noStroke();

    fill(this.c); 
    circle(0, 0, this.dia);
    fill(0);
    circle(-10, -10, 5)
    circle(10, -10, 5)
    ellipse(0, 10, 8, 9)

    // text(this.frameAtBirth, 10, 10)  // <-------------------
    // text(this.age, 10, 20)  // <-------------------
    text(this.alive, 10, 10);

    pop();
  }
  turnAngry(){
    this.c = this.angryColor; 
  }
  checkIfMouseIsOverMe(){
    // the mouse is over me 
    // of the distance between my location and mouse location is smaller than my radius
    let actualX = this.x + this.offsetX;
    let distance = dist(actualX, this.y, mouseX, mouseY);
    if(distance < this.dia/2){
      // this.turnAngry();
      this.alive = false;
    }
  }

  checkIfScared(){
    let actualX = this.x + this.offsetX;
    let distance = dist(actualX, this.y, mouseX, mouseY);
    if(distance < this.dia/2){
      // this.turnAngry();
      this.speedFactor = this.speedFactor*1.015;
    }
  }

}



function mousePressed(){
  // // turn everybody angry on click:
  // for (let i = 0; i < faces.length; i++) {
  //   faces[i].turnAngry();
  // }
  
  
  for (let i = 0; i < faces.length; i++) {
    // each face should check if it was clicked
    faces[i].checkIfMouseIsOverMe();
  }



}

function keyPressed(){
  faces.push(new Face(mouseX, mouseY));
}


