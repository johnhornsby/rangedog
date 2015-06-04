
export default class FrictionAnimator {
  
  constructor() {
    this.velocity = 0;
    this.tolerance = 1 / 1000;
    this.friction = 0.1;
    this.x = 0;
    this.destinationX = 1;
    this.acceleration = (this.destinationX - this.x) * this.friction;
    this.previousX = 0;
  }


  step(delta) {
    // delta is ignored in the FrictionAnimator
    this.velocity += this.acceleration;
    this.x += this.velocity;
    
    console.log(`acceleration ${this.acceleration} velocity ${this.velocity}`);
    
    this.velocity *= (1 - this.friction);
    
    // reset the acceleration as this is set initially
    this.acceleration = 0;
    this.previousX = this.x;

    return this.x;
  }


  isFinished() {
    return ( Math.round( this.velocity / this.tolerance) === 0 ) ? true: false;
  }

}