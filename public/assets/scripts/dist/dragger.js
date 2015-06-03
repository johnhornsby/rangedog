define(['exports', 'module', 'unidragger'], function (exports, module, _unidragger) {
	'use strict';

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj['default'] : obj; };

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	var _Unidragger2 = _interopRequire(_unidragger);

	var Dragger = (function (_Unidragger) {
		function Dragger(elem) {
			_classCallCheck(this, Dragger);

			_get(Object.getPrototypeOf(Dragger.prototype), 'constructor', this).call(this);
			this.handles = null;
			this.element = elem;
		}

		_inherits(Dragger, _Unidragger);

		_createClass(Dragger, [{
			key: 'create',
			value: function create() {
				this.handles = [this.element];
				this.bindHandles();
			}
		}, {
			key: 'dragStart',
			value: function dragStart(event, pointer) {
				console.log('drag start');
			}
		}, {
			key: 'dragMove',
			value: function dragMove(event, pointer, moveVector) {
				var dragX = this.dragStartPoint.x + moveVector.x;
				var dragY = this.dragStartPoint.y + moveVector.y;
				// this.element.style.left = dragX + 'px';
				// this.element.style.top = dragY + 'px';
			}
		}, {
			key: 'dragEnd',
			value: function dragEnd(event, pointer) {
				console.log('drag end');
			}
		}]);

		return Dragger;
	})(_Unidragger2);

	module.exports = Dragger;
});
//# sourceMappingURL=dragger.js.map