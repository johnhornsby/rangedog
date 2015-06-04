define(["exports", "module", "unidragger"], function (exports, module, _unidragger) {
	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _Unidragger2 = _interopRequireDefault(_unidragger);

	var Dragger = (function (_Unidragger) {
		function Dragger(elem) {
			_classCallCheck(this, Dragger);

			_get(Object.getPrototypeOf(Dragger.prototype), "constructor", this).call(this);
			this.handles = null;
			this.element = elem;
			this.last = 0;
			this.modifier = 0.25;
		}

		_inherits(Dragger, _Unidragger);

		_createClass(Dragger, [{
			key: "create",
			value: function create() {
				this.handles = [this.element];
				this.bindHandles();
			}
		}, {
			key: "dragStart",
			value: function dragStart(event, pointer) {
				console.log("drag start");
			}
		}, {
			key: "dragMove",
			value: function dragMove(event, pointer, moveVector) {
				// var dragX = this.dragStartPoint.x + moveVector.x;

				var x = this.modifier * moveVector.x;

				var delta = x - this.last;

				this.last = x;

				this.emit("dragMove", delta);
			}
		}, {
			key: "dragEnd",
			value: function dragEnd(event, pointer) {
				console.log("drag end");
			}
		}]);

		return Dragger;
	})(_Unidragger2["default"]);

	module.exports = Dragger;
});
//# sourceMappingURL=dragger.js.map