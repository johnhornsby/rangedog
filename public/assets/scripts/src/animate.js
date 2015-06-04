import Utils from "./utils";
import Friction from "./animators/friction";

const Animate = class Animate {

  
  constructor(options) {
   
    this._DEFAULT_OPTIONS = {
      time: 1000,
      startValue: 0,
      endValue: 1, 
      update: function(){},
      complete: function(){}
    };

    this._time = null;
    this._startValue = null;
    this._endValue = null;

    this._lastTime = null;
    this._startTime = null;
    this._options = {};
    this._deltas = null;
    this._isAnimating = false;
    this._animator = null;
    this._nowValue = null;

    this._init(options);
    return this;
  }
  
  
  start() {
    this._lastTime = 0;
    this._startTime = 0;
    this._deltas = [];

    this._animator = new Friction();
    this._start();
    return this;      
  }


  destroy() {
    console.log("destroy");
    window.cancelAnimationFrame(this._requestionAnimationFrameID);
    this._options = null;
  }

  
  _init(options) {
    // Quick merge of default and incoming options
    Utils.extend(this._options, this._DEFAULT_OPTIONS);
    Utils.extend(this._options, options);
    
    // time we can ignore for some of the animators
    this._time = this._options.time;
    this._startValue = this._options.startValue;
    this._endValue = this._options.endValue;
  }
  

  _start() {
    this._isAnimating = true;
    this._startTime = this._lastTime = new Date().getTime();
    this._tick();
  }
  
  
  _tick() {
    const now = new Date().getTime();
    let delta = (now - this._lastTime) / this._time;
    this._lastTime = now;

    // pass in normalised delta
    const normalisedAnimatedValue = this._animator.step(delta);

    if (this._animator.isFinished() === false) {
      this._nowValue = this._startValue + ((this._endValue - this._startValue) * normalisedAnimatedValue);
      this._options.update(this._nowValue);
      this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
    } else {
      this._nowValue = this._endValue
      this._options.update(this._nowValue);
      this._options.complete();
      this._isAnimating = false;
    }
  }
}

export default Animate;