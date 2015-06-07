define(["exports", "module"], function (exports, module) {
  "use strict";

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var FrictionAnimator = (function () {
    function FrictionAnimator() {
      var friction = arguments[0] === undefined ? 0.1 : arguments[0];

      _classCallCheck(this, FrictionAnimator);

      this._velocity = 0;
      this._tolerance = 1 / 1000;
      this._friction = friction;
      this._x = 0;
      this._destinationX = 1;
      this._acceleration = (this._destinationX - this._x) * this._friction;
      this._previousX = 0;
    }

    _createClass(FrictionAnimator, [{
      key: "step",
      value: function step(delta) {
        // delta is ignored in the FrictionAnimator
        this._velocity += this._acceleration;
        this._x += this._velocity;

        // console.log(`acceleration ${this._acceleration} velocity ${this._velocity}`);

        this._velocity *= 1 - this._friction;

        // reset the acceleration as this is set initially
        this._acceleration = 0;
        this._previousX = this._x;

        return this._x;
      }
    }, {
      key: "isFinished",
      value: function isFinished() {
        return Math.round(this._velocity / this._tolerance) === 0 ? true : false;
      }
    }]);

    return FrictionAnimator;
  })();

  module.exports = FrictionAnimator;
});