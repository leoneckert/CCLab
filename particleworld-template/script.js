// CCLab Mini Project - 9.R Particles Template

let NUM_OF_PARTICLES = 3; // Decide the initial number of particles.

let particles = [];

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_PARTICLES; i++) {
    particles[i] = new Particle(random(width), random(height));
  }
}

function draw() {
  background(50);

  // update and display
  for (let i = 0; i < particles.length; i++) {
    let p = particles[i];
    p.update();
    p.display();
  }
}

class Particle {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    // this.x2 = random(width)
    // this.y2 = random(height)
    this.dia = 30;

    this.xOffset = 0; // this allows me to not change the original x but still change location
    this.xSineAngle = random(2*PI); // used to create the sin oscillation
    this.randomExtent = random(10, 100); // how far left and right should it move?

  }
  // methods (functions): particle's behaviors
  update() {
    // (add) 
    this.xOffset = map(sin(this.xSineAngle), -1, 1, -this.randomExtent, this.randomExtent);
    this.xSineAngle += 0.05;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x+this.xOffset, this.y);

    circle(0, 0, this.dia);
    text(this.xOffset, 0, 0)

    pop();
  }
}
