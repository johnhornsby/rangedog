import EventEmitter from "eventEmitter/EventEmitter";

const Rangedog = class Rangedog extends EventEmitter {
	
	constructor(options) {
		super();
		this._length = 180;
		this._wrap = true;
		this._frameLength = 1;
		this._updateCallback = options.update;
		this._x = 0;
	}


	increment(deltaX) {
		const pojectedX = this._x + deltaX
		this._x = this._modulo(pojectedX, this._length);
		this._updateCallback(this._x);
	}


	_modulo( num, div ) {
  		return ( ( num % div ) + div ) % div;
	}



}

export default Rangedog;