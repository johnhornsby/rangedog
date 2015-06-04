import EventEmitter from "eventEmitter/EventEmitter";
import Animate from "./animate";

const Rangedog = class Rangedog extends EventEmitter {
	
	constructor(options) {
		super();
		this._length = 180;
		this._wrap = true;
		this._frameLength = 1;
		this._updateCallback = options.update;
		this._x = 0;
		this._animate = null;
	}


	increment(deltaX) {
		const x = this._x + deltaX
		this.setTo(x);
	}


	setTo(x) {
		this._x = this._modulo(x, this._length);
		this._updateCallback(this._x);
	}


	slideTo(x) {
		if (this._animate) {
			this._animate.destroy();
		}
		this._animate = new Animate({
			startValue: this._x,
			endValue: x,
			update: this._onAnimateUpdate.bind(this),
			complete: this._onAnimateComplete.bind(this)
		});
	}


	_modulo( num, div ) {
  		return ( ( num % div ) + div ) % div;
	}


	_onAnimateUpdate(x) {
		this.setTo(x);
	}


	_onAnimateComplete() {

	}


}

export default Rangedog;