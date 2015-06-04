define(["exports", "require", "jquery", "unidragger", "./rangedog", "./dragger"], function (exports, _require, _jquery, _unidragger, _rangedog, _dragger) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	// Bower Modules

	var _require2 = _interopRequire(_require);

	var _$ = _interopRequire(_jquery);

	var _Unidragger = _interopRequire(_unidragger);

	// App Modules

	var _Rangedog = _interopRequire(_rangedog);

	var _Dragger = _interopRequire(_dragger);

	var Main = (function () {
		function Main() {
			_classCallCheck(this, Main);

			this._rangedog = null;

			this._init();
		}

		_createClass(Main, [{
			key: "_init",
			value: function _init() {
				var elem = document.getElementsByClassName("range")[0];
				this._dragger = new _Dragger(elem);
				this._dragger.create();

				var options = {
					length: 180,
					start: 0,
					wrap: true,
					inertia: true,
					update: this._onRangeUpdate.bind(this)
				};
				this._rangedog = new _Rangedog(options);

				this._dragger.on("dragMove", this._onDragMove.bind(this));
			}
		}, {
			key: "_onRangeUpdate",
			value: function _onRangeUpdate(x) {
				console.log(x);
			}
		}, {
			key: "_onDragMove",
			value: function _onDragMove(deltaX) {
				// console.log(deltaX);
				this._rangedog.increment(deltaX);
			}
		}]);

		return Main;
	})();

	new Main();
});
//# sourceMappingURL=main.js.map