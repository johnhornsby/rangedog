define(["exports", "almond", "unidragger", "rangedog", "dragger"], function (exports, _almond, _unidragger, _rangedog, _dragger) {
	// Bower Modules
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _require = _interopRequireDefault(_almond);

	var _Unidragger = _interopRequireDefault(_unidragger);

	// App Modules

	var _Rangedog = _interopRequireDefault(_rangedog);

	var _Dragger = _interopRequireDefault(_dragger);

	var Main = (function () {
		function Main() {
			_classCallCheck(this, Main);

			this._rangedog = null;
			this._content = null;
			this._init();
		}

		_createClass(Main, [{
			key: "_init",
			value: function _init() {
				var elem = document.getElementsByClassName("range")[0];
				this._dragger = new _Dragger["default"](elem);
				this._dragger.create();

				var options = {
					length: 180,
					wrap: true,
					inertia: true,
					rounded: true,
					update: this._onRangeUpdate.bind(this)
				};
				this._rangedog = new _Rangedog["default"](options);

				this._dragger.on("dragMove", this._onDragMove.bind(this));
				this._dragger.on("dragEnd", this._onDragEnd.bind(this));

				var nextButton = document.getElementsByClassName("range__next")[0];
				var prevButton = document.getElementsByClassName("range__previous")[0];
				nextButton.addEventListener("click", this._onNextClick.bind(this));
				prevButton.addEventListener("click", this._onPreviousClick.bind(this));

				this._content = document.getElementsByClassName("range__content")[0];
			}
		}, {
			key: "_onNextClick",
			value: function _onNextClick() {
				this._rangedog.slideTo(this._rangedog.index - 50);
			}
		}, {
			key: "_onPreviousClick",
			value: function _onPreviousClick() {
				this._rangedog.slideTo(45);
			}
		}, {
			key: "_onRangeUpdate",
			value: function _onRangeUpdate(x) {

				console.log("_onRangeUpdate " + x);
				x *= -100;
				this._content.style.transform = "translate3d(" + x + "%, 0, 0)";
			}
		}, {
			key: "_onDragMove",
			value: function _onDragMove(deltaX) {
				// console.log(deltaX);
				this._rangedog.increment(deltaX);
			}
		}, {
			key: "_onDragEnd",
			value: function _onDragEnd() {
				this._rangedog.activateInertiaIfAny();
			}
		}]);

		return Main;
	})();

	new Main();
});
//# sourceMappingURL=main.js.map