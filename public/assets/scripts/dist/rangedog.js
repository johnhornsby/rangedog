define(["exports", "module", "eventEmitter/EventEmitter", "./animate"], function (exports, module, _eventEmitterEventEmitter, _animate) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _EventEmitter2 = _interopRequireDefault(_eventEmitterEventEmitter);

	var _Animate = _interopRequireDefault(_animate);

	var Rangedog = (function (_EventEmitter) {
		function Rangedog(options) {
			_classCallCheck(this, Rangedog);

			_get(Object.getPrototypeOf(Rangedog.prototype), "constructor", this).call(this);
			this._length = 180;
			this._wrap = true;
			this._frameLength = 1;
			this._updateCallback = options.update;
			this._x = 0;
			this._animate = null;
		}

		_inherits(Rangedog, _EventEmitter);

		_createClass(Rangedog, [{
			key: "increment",
			value: function increment(deltaX) {
				var x = this._x + deltaX;
				this.setTo(x);
			}
		}, {
			key: "setTo",
			value: function setTo(x) {
				this._x = this._modulo(x, this._length);
				this._updateCallback(this._x);
			}
		}, {
			key: "slideTo",
			value: function slideTo(x) {
				if (this._animate) {
					this._animate.destroy();
				}
				this._animate = new _Animate["default"]({
					startValue: this._x,
					endValue: x,
					update: this._onAnimateUpdate.bind(this),
					complete: this._onAnimateComplete.bind(this)
				});
			}
		}, {
			key: "_modulo",
			value: function _modulo(num, div) {
				return (num % div + div) % div;
			}
		}, {
			key: "_onAnimateUpdate",
			value: function _onAnimateUpdate(x) {
				this.setTo(x);
			}
		}, {
			key: "_onAnimateComplete",
			value: function _onAnimateComplete() {}
		}]);

		return Rangedog;
	})(_EventEmitter2["default"]);

	module.exports = Rangedog;
});
//# sourceMappingURL=rangedog.js.map