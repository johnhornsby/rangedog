define(["exports", "module"], function (exports, module) {
	"use strict";

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var SpringAnimator = (function () {
		function SpringAnimator() {
			_classCallCheck(this, SpringAnimator);

			this.velocity = 0;
			this.tolerance = 1 / 1000;
			this.stiffness = 50; //50
			this.damping = 1; //2
			this.mass = 0.2; //0.2
			this.value = 0;
		}

		_createClass(SpringAnimator, [{
			key: "step",
			value: function step(delta) {
				var k = 0 - this.stiffness;
				var b = 0 - this.damping;

				var F_spring = k * (this.value - 1);
				var F_damper = b * this.velocity;

				this.velocity += (F_spring + F_damper) / this.mass * delta;
				this.value += this.velocity * delta;

				return this.value;
			}
		}, {
			key: "isFinished",
			value: function isFinished() {
				return Math.round(this.velocity / this.tolerance) === 0 ? true : false;
			}
		}]);

		return SpringAnimator;
	})();

	module.exports = SpringAnimator;
});
//# sourceMappingURL=spring.js.map