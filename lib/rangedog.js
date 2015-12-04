"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _wolfy87Eventemitter = require("wolfy87-eventemitter");

var _wolfy87Eventemitter2 = _interopRequireDefault(_wolfy87Eventemitter);

var RangeDog = (function (_EventEmitter) {
	_inherits(RangeDog, _EventEmitter);

	_createClass(RangeDog, null, [{
		key: "_DEFAULT_OPTIONS",
		value: {
			length: 1,
			frameLength: 1,
			cellLength: 1,
			wrap: false,
			rounded: false,
			contain: false
		},
		enumerable: true
	}, {
		key: "EVENT_UPDATE",
		value: "eventUpdate",
		enumerable: true
	}]);

	function RangeDog(options) {
		_classCallCheck(this, RangeDog);

		_get(Object.getPrototypeOf(RangeDog.prototype), "constructor", this).call(this);

		this._options = {};
		this._length = null;
		this._wrap = null;
		this._rounded = null;
		this._contain = null;
		this._x = 0;
		this._roundedX = 0;
		this._init(options);
	}

	/*_______________________________________________
 	Public Methods
 _______________________________________________*/

	_createClass(RangeDog, [{
		key: "getX",
		value: function getX(rounded) {
			return this._getX(rounded);
		}
	}, {
		key: "increment",
		value: function increment(deltaX) {
			this._increment(deltaX);
		}
	}, {
		key: "setTo",
		value: function setTo(x) {
			this._setTo(x);
		}
	}, {
		key: "getNearestCellX",
		value: function getNearestCellX(xFrom, direction, shouldWrap) {
			if (direction === undefined) direction = 0;
			return this._getNearestCellX(xFrom, direction, shouldWrap);
		}
	}, {
		key: "getDirection",
		value: function getDirection(xFrom, xTo) {
			return this._getDirection(xFrom, xTo);
		}
	}, {
		key: "getDistanceX",
		value: function getDistanceX(xFrom, xTo) {
			var direction = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var getNearest = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
			return this._getDistanceX(xFrom, xTo, direction, getNearest);
		}
	}, {
		key: "destroy",
		value: function destroy() {
			this._destroy();
		}
	}, {
		key: "modulo",
		value: function modulo(x) {
			return this._modulo(x, this._length);
		}

		/*_______________________________________________
  	Private Methods
  _______________________________________________*/

	}, {
		key: "_init",
		value: function _init(options) {
			this._options = _extends({}, RangeDog._DEFAULT_OPTIONS, options);
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
	}, {
		key: "_getNearestCellX",
		value: function _getNearestCellX(xFrom, direction, shouldWrap) {
			if (direction === undefined) direction = 0;

			var x = undefined;
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
			if (this._wrap === true && shouldWrap == null || shouldWrap == true) {
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
	}, {
		key: "_getDirection",
		value: function _getDirection(xFrom, xTo) {
			var distanceRight = undefined;
			var distanceLeft = undefined;

			if (xTo >= xFrom) {
				// 1
				distanceRight = xTo - xFrom;
				distanceLeft = xFrom + (this._length - xTo);
			} else {
				distanceRight = xTo + (this._length - xFrom);
				distanceLeft = xFrom - xTo;
			}

			return distanceRight < distanceLeft ? 1 : -1;
		}
	}, {
		key: "_getDistanceX",
		value: function _getDistanceX(xFrom, xTo) {
			var direction = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var shouldWrap = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

			direction = xTo < xFrom ? -1 : 1;
			// no wrap leave from and to as it, and allows compution from outside of the range,
			// otherwise computation is forced within
			if (shouldWrap) {
				xTo = this._modulo(xTo, this._length);
				xFrom = this._modulo(xFrom, this._length);
			}

			// correctly polarised
			var distance = xTo - xFrom;
			if (shouldWrap) {

				var wrappedDistance = Math.min(xTo, xFrom) + (this._length - Math.max(xTo, xFrom));
				if (wrappedDistance < Math.abs(distance)) {

					// polarise wrapped distance as it will by default be positive
					wrappedDistance *= direction;

					return wrappedDistance;
				}
			}

			return distance;
		}
	}, {
		key: "_increment",
		value: function _increment(deltaX) {
			var x = this._x + deltaX;
			this._setX(x);
		}
	}, {
		key: "_setTo",
		value: function _setTo(x) {
			this._setX(x);
		}
	}, {
		key: "_checkAndAdjustPolarityForShortestDistance",
		value: function _checkAndAdjustPolarityForShortestDistance(to, from, length) {
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
			var distance = to - from;
			var reverseDistance = 0;
			if (distance < 0) {
				reverseDistance = to + (length - from);
				if (Math.abs(distance) < reverseDistance) {
					return to;
				} else {
					return from + reverseDistance;
				}
			} else {
				reverseDistance = from + (length - to);
				if (distance < reverseDistance) {
					return to;
				} else {
					return from - reverseDistance;
				}
			}
		}
	}, {
		key: "_destroy",
		value: function _destroy() {
			this.removeAllListeners();
		}
	}, {
		key: "_setX",
		value: function _setX(x) {
			var roundedX = undefined;
			var returnX = x;
			var hasChanged = true;

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
	}, {
		key: "_getX",
		value: function _getX() {
			var isRounded = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

			return isRounded ? this._roundedX : this._x;
		}

		// thanks deSandro
		// + length and additional modulo operation to handle negative x
	}, {
		key: "_modulo",
		value: function _modulo(x, length) {
			return (x % length + length) % length;
		}
	}, {
		key: "x",
		get: function get() {
			return this._getX(this._rounded);
		},
		set: function set(x) {
			this._setTo(x);
		}
	}]);

	return RangeDog;
})(_wolfy87Eventemitter2["default"]);

exports["default"] = RangeDog;
module.exports = exports["default"];