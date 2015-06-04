define(["exports", "require", "jquery", "unidragger", "utils", "./dragger"], function (exports, _require, _jquery, _unidragger, _utils, _dragger) {
	// Bower Modules
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require2 = _interopRequireDefault(_require);

	var _$ = _interopRequireDefault(_jquery);

	var _Unidragger = _interopRequireDefault(_unidragger);

	// App Modules
	// import Rangedog from "./rangedog";

	var _Dragger = _interopRequireDefault(_dragger);

	var Main = (function () {
		function Main() {
			_classCallCheck(this, Main);

			this._rangedog = null;
			this._init();
			console.log(_utils.sum[(1, 2, 3)]);
		}

		_createClass(Main, [{
			key: "_init",
			value: function _init() {
				var elem = document.getElementsByClassName("range")[0];
				this._dragger = new _Dragger["default"](elem);
				this._dragger.create();

				var options = {
					length: 180,
					start: 0,
					wrap: true,
					inertia: true,
					update: this._onRangeUpdate.bind(this)
				};
				// this._rangedog = new Rangedog(options);

				this._dragger.on("dragMove", this._onDragMove.bind(this));

				(0, _$["default"])(".range__next").on("click", this._onNextClick.bind(this));
			}
		}, {
			key: "_onNextClick",
			value: function _onNextClick() {}
		}, {
			key: "_onRangeUpdate",
			value: function _onRangeUpdate(x) {
				console.log(x);
			}
		}, {
			key: "_onDragMove",
			value: function _onDragMove(deltaX) {}
		}]);

		return Main;
	})();

	new Main();
});

// this._rangedog.slideTo(90);

// console.log(deltaX);
// this._rangedog.increment(deltaX);
//# sourceMappingURL=main.js.map