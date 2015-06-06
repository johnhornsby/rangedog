import EventEmitter from "eventEmitter/EventEmitter";
import Animate from "./animate";
import Utils from "./utils";


export default class Rangedog extends EventEmitter {


	static get _DEFAULT_OPTIONS() { return {
		length: 1,
		frameLength:1,
		wrap: false,
		inertia: false,
		rounded: false
	}}


	static get RANGEDOG_EVENT_UPDATE() { return "eventUpdate" };

	static get RANGEDOG_EVENT_INERTIA_COMPLETE() { return "eventInertiaComplete" };

	static get RANGEDOG_EVENT_INERTIA_NONE() { return "eventInertiaNone" };

	static get RANGEDOG_EVENT_INERTIA_START() { return "eventInertiaStart" };
	

	constructor(options) {
		super();

		this._options = {};
		this._length = null;
		this._inertia = null;
		this._wrap = null;
		this._rounded = null;
		this._updateCallback = null;

		this._x = 0;
		this._roundedX = 0;
		this._deltas = null;
		this._animateInstance = null;
		this._isAnimating = true;

		this._init(options);
	}


	get index() { return this._getX() }

	increment(deltaX) { this._increment(deltaX) }

	setTo(x) { this._setTo(x) }

	slideTo(x) { this._slideTo(x) }

	stop() { this._stop() }

	activateInertiaIfAny() { this._activateInertia() }


	_init(options) {
		// Quick merge of default and incoming options
		Utils.extend(this._options, Rangedog._DEFAULT_OPTIONS);
		Utils.extend(this._options, options);
		this._length = this._options.length;
		this._wrap = this._options.wrap;
		this._inertia = this._options.inertia;
		this._rounded = this._options.rounded;
		this._updateCallback = this._options.update;
		this._deltas = [];
	}


	_increment(deltaX) {
		this._clearAnimation();
		const x = this._x + deltaX
		this._deltas.push({x:deltaX, time: new Date().getTime()});
		this._setX(x);
	}


	_setTo(x) {
		this._clearAnimation();
		this._setX(x);
	}


	_slideTo(x, toNearest = true) {
		this._clearAnimation();
		if (x === this._x) {
			return false;
		}
		this._isAnimating = true;
		if (toNearest === true) {
			x = this._checkAndAdjustPolarityForShortestDistance(x, this._x, this._length);
		}
		this._animateInstance = new Animate({
			startValue: this._x,
			endValue: x,
			update: this._onAnimateUpdate.bind(this),
			complete: this._onAnimateComplete.bind(this)
		});
		this._animateInstance.start();
		return true;
	}


	_checkAndAdjustPolarityForShortestDistance(to, from, length) {
		// example 1
		// to = 10
		// from = 170
		// distance = 10 - 170 = -160
		// reverse = 10 + (180 - 170) = 20
		// return 170 + 20 = 190
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
		


	_stop() {
		this._clearAnimation();
	}


	_setX(x) {
		this._x = x;
		if (this._wrap === true) {
			this._x = this._modulo(x, this._length);
		}
		if (this._rounded === true) {
			x = Math.round(this._x);
			if (x === this._length) {
				x = 0;
			}
			if (this._roundedX === x) {
				// avoid calling callback
				return false;
			} else {
				this._roundedX = x;
			}
		}
		this.emit(Rangedog.RANGEDOG_EVENT_UPDATE, x);
	}


	_getX() {
		let x = this._x;
		if (this._rounded === true) {
			x = Math.round(this._x);
			if (x === this._length) {
				x = 0;
			}
		}
		return x;
	}


	_modulo( num, div ) {
  		return ( ( num % div ) + div ) % div;
	}


	_clearAnimation() {
		this._isAnimating = false;
		if (this._animateInstance) {
			this._animateInstance.destroy();
			this._animateInstance = null;
		}
	}


	_onAnimateUpdate(x) {
		this._setX(x);
	}


	_onAnimateComplete() {
		this._clearAnimation();
		this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_COMPLETE);
	}


	_activateInertia() {
		let hasInertia = true;
		if (!this._deltas && this._deltas.length === 0) {
			hasInertia = false;
		}
		const deltaInfo = this._deltas.pop();
		const velocity = deltaInfo.x;
		if (new Date().getTime() - deltaInfo.time > 100) {
			hasInertia = false;
		}
		if (hasInertia === true) {
			const destinationX = this._x + (velocity / 0.1);
			this._slideTo(destinationX, false);
			this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_START);
		} else {
			this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_NONE);
		}
	}
}