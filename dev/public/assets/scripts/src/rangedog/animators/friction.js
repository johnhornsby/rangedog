export default class FrictionAnimator {
  

  constructor() {
    this._velocity = 0;
    this._tolerance = 1 / 1000;
    this._friction = 0.1;
    this._x = 0;
    this._destinationX = 1;
    this._acceleration = (this._destinationX - this._x) * this._friction;
    this._previousX = 0;
  }


  step(delta) {
    // delta is ignored in the FrictionAnimator
    this._velocity += this._acceleration;
    this._x += this._velocity;
    
    // console.log(`acceleration ${this._acceleration} velocity ${this._velocity}`);
    
    this._velocity *= (1 - this._friction);
    
    // reset the acceleration as this is set initially
    this._acceleration = 0;
    this._previousX = this._x;

    return this._x;
  }


  isFinished() {
    return ( Math.round( this._velocity / this._tolerance) === 0 ) ? true: false;
  }
}