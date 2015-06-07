define(["exports", "require", "rangedog/rangedog", "dragger"], function (exports, _require, _rangedogRangedog, _dragger) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// Bower Modules

	var _require2 = _interopRequire(_require);

	// App Modules

	var _Rangedog = _interopRequire(_rangedogRangedog);

	var _Dragger = _interopRequire(_dragger);

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
				this._dragger = new _Dragger(elem);
				this._dragger.activate();

				var options = {
					length: 180,
					wrap: true,
					inertia: true,
					rounded: true
				};
				this._rangedog = new _Rangedog(options);
				this._rangedog.on(_Rangedog.RANGEDOG_EVENT_UPDATE, this._onRangeUpdate.bind(this));
				this._rangedog.on(_Rangedog.RANGEDOG_EVENT_INERTIA_COMPLETE, this._onRangeInertiaComplete.bind(this));
				this._rangedog.on(_Rangedog.RANGEDOG_EVENT_INERTIA_NONE, this._onRangeInertiaNone.bind(this));
				this._rangedog.on(_Rangedog.RANGEDOG_EVENT_INERTIA_START, this._onRangeInertiaStart.bind(this));
				this._rangedog.on(_Rangedog.RANGEDOG_EVENT_SLIDE_TO_COMPLETE, this._onRangeSlideToComplete.bind(this));

				this._dragger.on("dragStart", this._onDragStart.bind(this));
				this._dragger.on("dragMove", this._onDragMove.bind(this));
				this._dragger.on("dragEnd", this._onDragEnd.bind(this));
				this._dragger.on("pointerDone", this._onPointerDone.bind(this));

				var nextButton = document.getElementsByClassName("range__next")[0];
				var prevButton = document.getElementsByClassName("range__previous")[0];
				nextButton.addEventListener("click", this._onNextClick.bind(this));
				prevButton.addEventListener("click", this._onPreviousClick.bind(this));

				this._content = document.getElementsByClassName("range__content")[0];
			}
		}, {
			key: "_onNextClick",
			value: function _onNextClick() {
				this._rangedog.slideTo(this._rangedog.index - 50, 0.05);
			}
		}, {
			key: "_onPreviousClick",
			value: function _onPreviousClick() {
				this._rangedog.slideTo(45, 0.33);
			}
		}, {
			key: "_onRangeUpdate",
			value: function _onRangeUpdate(x) {
				// console.log(`_onRangeUpdate ${x}`);
				x *= -100;
				this._content.style.transform = "translate3d(" + x + "%, 0, 0)";
			}
		}, {
			key: "_onRangeInertiaComplete",
			value: function _onRangeInertiaComplete() {
				console.log("_onRangeInertiaComplete");
			}
		}, {
			key: "_onRangeInertiaNone",
			value: function _onRangeInertiaNone() {
				console.log("_onRangeInertiaNone");
			}
		}, {
			key: "_onRangeInertiaStart",
			value: function _onRangeInertiaStart() {
				console.log("_onRangeInertiaStart");
			}
		}, {
			key: "_onRangeSlideToComplete",
			value: function _onRangeSlideToComplete() {
				console.log("_onRangeSlideToComplete");
			}
		}, {
			key: "_onDragMove",
			value: function _onDragMove(deltaX) {
				console.log(deltaX);
				this._rangedog.increment(deltaX);
			}
		}, {
			key: "_onDragStart",
			value: function _onDragStart() {
				console.log("_onDragStart");
			}
		}, {
			key: "_onPointerDone",
			value: function _onPointerDone() {
				console.log("_onPointerDone");
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