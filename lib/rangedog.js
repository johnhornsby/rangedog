define(["exports", "module", "eventEmitter/EventEmitter", "rangedog/animate", "rangedog/utils"], function (exports, module, _eventEmitterEventEmitter, _rangedogAnimate, _rangedogUtils) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _EventEmitter2 = _interopRequire(_eventEmitterEventEmitter);

	var _Animate = _interopRequire(_rangedogAnimate);

	var _Utils = _interopRequire(_rangedogUtils);

	var Rangedog = (function (_EventEmitter) {
		function Rangedog(options) {
			_classCallCheck(this, Rangedog);

			_get(Object.getPrototypeOf(Rangedog.prototype), "constructor", this).call(this);

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
			this._isAnimating = false;
			this._isAnimatingInertia = false;

			this._init(options);
		}

		_inherits(Rangedog, _EventEmitter);

		_createClass(Rangedog, [{
			key: "index",
			get: function () {
				return this._getX();
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
			key: "slideTo",
			value: function slideTo(x, friction) {
				this._slideTo(x, friction);
			}
		}, {
			key: "stop",
			value: function stop() {
				this._stop();
			}
		}, {
			key: "activateInertiaIfAny",
			value: function activateInertiaIfAny() {
				this._activateInertia();
			}
		}, {
			key: "destroy",
			value: function destroy() {
				this._destroy();
			}
		}, {
			key: "_init",
			value: function _init(options) {
				// Quick merge of default and incoming options
				_Utils.extend(this._options, Rangedog._DEFAULT_OPTIONS);
				_Utils.extend(this._options, options);
				this._length = this._options.length;
				this._wrap = this._options.wrap;
				this._inertia = this._options.inertia;
				this._rounded = this._options.rounded;
				this._updateCallback = this._options.update;
				this._deltas = [];
			}
		}, {
			key: "_increment",
			value: function _increment(deltaX) {
				this._clearAnimation();
				var x = this._x + deltaX;
				this._deltas.push({ x: deltaX, time: new Date().getTime() });
				this._setX(x);
			}
		}, {
			key: "_setTo",
			value: function _setTo(x) {
				this._clearAnimation();
				this._setX(x);
			}
		}, {
			key: "_slideTo",
			value: function _slideTo(x, friction) {
				var toNearest = arguments[2] === undefined ? true : arguments[2];
				var isInertia = arguments[3] === undefined ? false : arguments[3];

				this._clearAnimation();
				if (x === this._x) {
					return false;
				}
				this._isAnimating = true;
				this._isAnimatingInertia = isInertia;
				if (toNearest === true) {
					x = this._checkAndAdjustPolarityForShortestDistance(x, this._x, this._length);
				}
				this._animateInstance = new _Animate({
					startValue: this._x,
					endValue: x,
					update: this._onAnimateUpdate.bind(this),
					complete: this._onAnimateComplete.bind(this),
					friction: friction
				});
				this._animateInstance.start();
				return true;
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
			key: "_stop",
			value: function _stop() {
				this._clearAnimation();
			}
		}, {
			key: "_destroy",
			value: function _destroy() {
				this._stop();
				this.removeAllListeners();
			}
		}, {
			key: "_setX",
			value: function _setX(x) {
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
		}, {
			key: "_getX",
			value: function _getX() {
				var x = this._x;
				if (this._rounded === true) {
					x = Math.round(this._x);
					if (x === this._length) {
						x = 0;
					}
				}
				return x;
			}
		}, {
			key: "_modulo",
			value: function _modulo(num, div) {
				return (num % div + div) % div;
			}
		}, {
			key: "_clearAnimation",
			value: function _clearAnimation() {
				this._isAnimating = this._isAnimatingInertia = false;
				if (this._animateInstance) {
					this._animateInstance.destroy();
					this._animateInstance = null;
				}
			}
		}, {
			key: "_onAnimateUpdate",
			value: function _onAnimateUpdate(x) {
				this._setX(x);
			}
		}, {
			key: "_onAnimateComplete",
			value: function _onAnimateComplete() {
				if (this._isAnimatingInertia === true) {
					this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_COMPLETE);
				} else {
					this.emit(Rangedog.RANGEDOG_EVENT_SLIDE_TO_COMPLETE);
				}
				this._clearAnimation();
			}
		}, {
			key: "_activateInertia",
			value: function _activateInertia() {
				var hasInertia = true;
				if (!this._deltas && this._deltas.length === 0) {
					hasInertia = false;
				}
				var deltaInfo = this._deltas.pop();
				var velocity = deltaInfo.x;
				if (new Date().getTime() - deltaInfo.time > 100) {
					hasInertia = false;
				}
				if (hasInertia === true) {
					var destinationX = this._x + velocity / 0.1;
					this._slideTo(destinationX, 0.1, false, true);
					this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_START);
				} else {
					this.emit(Rangedog.RANGEDOG_EVENT_INERTIA_NONE);
				}
			}
		}], [{
			key: "_DEFAULT_OPTIONS",
			get: function () {
				return {
					length: 1,
					frameLength: 1,
					wrap: false,
					inertia: false,
					rounded: false
				};
			}
		}, {
			key: "RANGEDOG_EVENT_UPDATE",
			get: function () {
				return "eventUpdate";
			}
		}, {
			key: "RANGEDOG_EVENT_INERTIA_COMPLETE",
			get: function () {
				return "eventInertiaComplete";
			}
		}, {
			key: "RANGEDOG_EVENT_INERTIA_NONE",
			get: function () {
				return "eventInertiaNone";
			}
		}, {
			key: "RANGEDOG_EVENT_INERTIA_START",
			get: function () {
				return "eventInertiaStart";
			}
		}, {
			key: "RANGEDOG_EVENT_SLIDE_TO_COMPLETE",
			get: function () {
				return "eventSlideToComplete";
			}
		}]);

		return Rangedog;
	})(_EventEmitter2);

	module.exports = Rangedog;
});