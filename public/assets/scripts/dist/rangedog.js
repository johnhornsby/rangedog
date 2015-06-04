define(["exports", "module", "eventEmitter/EventEmitter"], function (exports, module, _eventEmitterEventEmitter) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _EventEmitter2 = _interopRequire(_eventEmitterEventEmitter);

	var Rangedog = (function (_EventEmitter) {
		function Rangedog(options) {
			_classCallCheck(this, Rangedog);

			_get(Object.getPrototypeOf(Rangedog.prototype), "constructor", this).call(this);
			this._length = 180;
			this._wrap = true;
			this._frameLength = 1;
			this._updateCallback = options.update;
			this._x = 0;
		}

		_inherits(Rangedog, _EventEmitter);

		_createClass(Rangedog, [{
			key: "increment",
			value: function increment(deltaX) {
				var pojectedX = this._x + deltaX;
				this._x = this._modulo(pojectedX, this._length);
				this._updateCallback(this._x);
			}
		}, {
			key: "_modulo",
			value: function _modulo(num, div) {
				return (num % div + div) % div;
			}
		}]);

		return Rangedog;
	})(_EventEmitter2);

	module.exports = Rangedog;
});
//# sourceMappingURL=rangedog.js.map