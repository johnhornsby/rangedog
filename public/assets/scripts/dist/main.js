define(["exports", "require", "jquery", "unidragger", "./rangedog"], function (exports, _require, _jquery, _unidragger, _rangedog) {
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

	var Main = (function () {
		function Main() {
			_classCallCheck(this, Main);

			this._rangedog = null;

			this._init();
		}

		_createClass(Main, [{
			key: "_init",
			value: function _init() {
				this._rangedog = new _Rangedog();
			}
		}]);

		return Main;
	})();

	new Main();
});
//# sourceMappingURL=main.js.map