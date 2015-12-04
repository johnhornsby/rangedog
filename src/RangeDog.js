import EventEmitter from "wolfy87-eventemitter";


export default class RangeDog extends EventEmitter {


	static _DEFAULT_OPTIONS = {
		length: 1,
		frameLength:1,
		cellLength:1,
		wrap: false,
		rounded: false, 
		contain: false
	};


	static EVENT_UPDATE = "eventUpdate";


	_options = {};

	_length = null;

	_wrap = null;

	_rounded = null;

	_contain = null;

	_x = 0;

	_roundedX = 0;


	constructor(options) {
		super();

		this._init(options);
	}






	/*_______________________________________________

	Public Methods
	_______________________________________________*/

	getX(rounded) { return this._getX(rounded) }


	get x() { return this._getX(this._rounded) }


	set x(x) { this._setTo(x) }


	increment(deltaX) { this._increment(deltaX) }


	setTo(x) { this._setTo(x) }


	getNearestCellX(xFrom, direction = 0, shouldWrap) { return this._getNearestCellX(xFrom, direction, shouldWrap) }


	getDirection(xFrom, xTo) { return  this._getDirection(xFrom, xTo) }


	getDistanceX(xFrom, xTo, direction = 0, getNearest = false) { return  this._getDistanceX(xFrom, xTo, direction, getNearest) }


	destroy() { this._destroy() }


	modulo(x) { return this._modulo(x, this._length) }






	/*_______________________________________________

	Private Methods
	_______________________________________________*/

	_init(options) {
		this._options = {
			...RangeDog._DEFAULT_OPTIONS,
			...options
		}
		this._length = this._options.length;
		this._wrap = this._options.wrap;
		this._rounded = this._options.rounded;
		this._contain = this._options.contain;
	}


	/*
	 * Gets the nearest cell to te current position of xFrom
	 *
	 * @private
	*/
	_getNearestCellX(xFrom, direction = 0, shouldWrap) {
		let x;
		// if direction is specified then we look only in that direction for the nearest cell
		if (direction > 0) {
			// nearest cell to the right
			x = Math.ceil(xFrom / this._options.cellLength) * this._options.cellLength;
		} else if (direction < 0) {
			// nearest cell to the left
			x = Math.floor(xFrom / this._options.cellLength) * this._options.cellLength;
		} else {
			// nearest cell in any direction
			x = Math.round(xFrom / this._options.cellLength) * this._options.cellLength;
		}
		// if we are wrapping then ensure result is contained within range
		if ((this._wrap === true && shouldWrap == null) || shouldWrap == true) {
			x = this._modulo(x, this._length);
		} else {
			// we need to check here even though no wrap and the ability to calculate outside of the range
			// we can not allow non existant cell positions to be generated, ie -100 or 100 + beyound range length
			// so we limit nearest cells to that within the range although also including the end represented by the length.
			x = Math.max(x, 0);
			x = Math.min(x, this._options.length);
		}

		return x;
	}


	_getDirection(xFrom, xTo) {
		let distanceRight;
		let distanceLeft;

		if (xTo >= xFrom) { // 1
			distanceRight = xTo - xFrom;
			distanceLeft = xFrom + (this._length - xTo);
		} else {
			distanceRight = xTo + (this._length - xFrom);
			distanceLeft = xFrom - xTo;
		}

		return (distanceRight < distanceLeft) ? 1: -1;
	}


	_getDistanceX(xFrom, xTo,  direction = 0, shouldWrap = false) {
		
		direction = (xTo < xFrom) ? -1: 1;
		// no wrap leave from and to as it, and allows compution from outside of the range,
		// otherwise computation is forced within
		if (shouldWrap) {
			xTo = this._modulo(xTo, this._length);
			xFrom = this._modulo(xFrom, this._length);	
		}

		// correctly polarised
		let distance = xTo - xFrom;
		if (shouldWrap) {

			let wrappedDistance = Math.min(xTo, xFrom) + (this._length - Math.max(xTo, xFrom));
			if (wrappedDistance < Math.abs(distance)) {

				// polarise wrapped distance as it will by default be positive
				wrappedDistance *= direction;

				return wrappedDistance;
			}
		}
		 
		return  distance;
	}


	_increment(deltaX) {
		const x = this._x + deltaX
		this._setX(x);
	}


	_setTo(x) {
		this._setX(x);
	}


	_checkAndAdjustPolarityForShortestDistance(to, from, length) {
		// example 1
		// to = 10
		// from = 170
		// distance = 10 - 170 = -160
		// reverse = 10 + (180 - 170) = 20
		// return 170 + 20 = 190
		//
		// example 2
		// to = 170
		// from = 10
		// distance = 170 - 10 = 160
		// reverse = 10 + (180 - 170) = 20
		// return 10 - 20 = -10
		const distance = to - from;
		let reverseDistance = 0;
		if (distance < 0) {
			reverseDistance = to + (length - from);
			if (Math.abs(distance) < reverseDistance) {
				return to;
			}else{
				return from + reverseDistance;
			}
		} else {
			reverseDistance = from + (length - to);
			if (distance < reverseDistance) {
				return to;
			}else{
				return from - reverseDistance;
			}
		}
	}


	_destroy() {
		this.removeAllListeners();
	}


	_setX(x) {
		let roundedX;
		let returnX = x;
		let hasChanged = true;

		if (this._wrap === true) {
			x = this._modulo(x, this._length);
		} else if (this._contain) {
			x = Math.min(x, this._length);
			x = Math.max(x, 0);
		}

		//always update the real x whether rounded or not
		this._x = returnX = x;

		if (this._rounded === true) {
			roundedX = Math.round(returnX);
			roundedX = this._modulo(roundedX, this._length);

			if (roundedX !== this._roundedX) {
				this._roundedX = returnX = roundedX;
			} else {
				hasChanged = false;
			}
		}

		if (hasChanged) {
			this.emit(RangeDog.EVENT_UPDATE, returnX);
		}
	}


	_getX(isRounded = false) {
		return (isRounded)? this._roundedX: this._x;
	}


	// thanks deSandro
	// + length and additional modulo operation to handle negative x
	_modulo( x, length ) {
  		return ( ( x % length ) + length ) % length;
	}
}