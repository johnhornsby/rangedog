define(["exports", "module"], function (exports, module) {
  "use strict";

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var FrictionAnimator = (function () {
    function FrictionAnimator() {
      _classCallCheck(this, FrictionAnimator);

      this.velocity = 0;
      this.tolerance = 1 / 1000;
      this.friction = 0.1;
      this.x = 0;
      this.destinationX = 1;
      this.acceleration = (this.destinationX - this.x) * this.friction;
      this.previousX = 0;
    }

    _createClass(FrictionAnimator, [{
      key: "step",
      value: function step(delta) {
        // delta is ignored in the FrictionAnimator
        this.velocity += this.acceleration;
        this.x += this.velocity;

        // console.log(`acceleration ${this.acceleration} velocity ${this.velocity}`);

        this.velocity *= 1 - this.friction;

        // reset the acceleration as this is set initially
        this.acceleration = 0;
        this.previousX = this.x;

        return this.x;
      }
    }, {
      key: "isFinished",
      value: function isFinished() {
        return Math.round(this.velocity / this.tolerance) === 0 ? true : false;
      }
    }]);

    return FrictionAnimator;
  })();

  module.exports = FrictionAnimator;
});