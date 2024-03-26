
// let egg1;
// let egg2;

let basket = [];
let numEggs = 2;

let readInstructions = false;

function setup() {
  let canvas = createCanvas(500, 400);
  canvas.parent("canvasContainer");
  background(220);

  // 1.make eggs with single variables:
  // egg1 = new Egg(random(width), random(height));
  // egg2 = new Egg(random(width), random(height));

  // 2.make eggs one by one and put them into an array:
  // basket[0] = new Egg(random(width), random(height));
  // basket[1] = new Egg(random(width), random(height));

  // let newEgg = new Egg(random(width), random(height));
  // basket.push(newEgg);

  // basket.push( new Egg(random(width), random(height)) );

  // 3.create and add eggs to array inside fo loop:
  for (let i = 0; i < numEggs; i++) {
    basket.push(new Egg(random(width), random(height)));
  }


  console.log(basket);
}

function draw() {
  background(120, 90, 230);

  
  // egg1.display();
  // egg2.display();

  // first: loop as any times as there are objects in the basket array
  for (let i = 0; i < basket.length; i++) {
    // then: in each loop, display an egg from the basket
    basket[i].update();
    basket[i].display();

  }

  if(readInstructions == false){
    textAlign(CENTER);
    text("press to lay eggs", width/2, height/2);
  }
  

}


class Egg {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.s = random(0.3, 1);
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);

    this.showYolk = true;

    this.randomDraw = random(100);

  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // make em bounce
    // check width and 0 boundaries
    // if lower or higher turn around the speedX
    if (this.x < 0 || this.x > width) {
      this.speedX = -this.speedX;

      // yolk switch version 1:
      // if(this.showYolk == true){
      //   this.showYolk = false
      // }else{
      //   this.showYolk = true;
      // }

      // yolk switch version 2:
      this.showYolk = !this.showYolk;

    }
    if(this.y < 0 || this.y > height){
      this.speedY = -this.speedY;
      this.showYolk = !this.showYolk;
    }

  }
  display() {
    push();
    translate(this.x, this.y);
    scale(this.s);
    noStroke();
    fill(255, 200);
    arc(0, 0, 80, 80, 0, PI);
    arc(0, 0, 80, 130, PI, 2 * PI);

    if (this.showYolk == true) {
      // yolk:
      if(this.randomDraw < 5){
        fill(50, 168, 82); // green
      }else{
        fill(255, 164, 0); // yellow
      }
      
      circle(0, 0, 40);
    }


    pop();
  }
}

function mousePressed(){
  readInstructions = true;

  console.log("mouse was pressed i guess");
  basket.push(new Egg(mouseX, mouseY));
}