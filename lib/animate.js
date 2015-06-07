define(["exports", "module", "rangedog/utils", "rangedog/animators/friction"], function (exports, module, _rangedogUtils, _rangedogAnimatorsFriction) {
  "use strict";

  var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

  var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  var _Utils = _interopRequire(_rangedogUtils);

  var _Friction = _interopRequire(_rangedogAnimatorsFriction);

  var Animate = (function () {
    function Animate(options) {
      _classCallCheck(this, Animate);

      this._time = null;
      this._startValue = null;
      this._endValue = null;

      this._lastTime = null;
      this._startTime = null;
      this._options = {};
      this._deltas = null;
      this._isAnimating = false;
      this._animator = null;
      this._nowValue = null;

      this._init(options);
      return this;
    }

    _createClass(Animate, [{
      key: "start",
      value: function start() {
        this._start();
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._destroy();
      }
    }, {
      key: "_init",
      value: function _init(options) {
        // Quick merge of default and incoming options
        _Utils.extend(this._options, Animate._DEFAULT_OPTIONS, true);
        _Utils.extend(this._options, options, true);

        // time we can ignore for some of the animators
        this._time = this._options.time;
        this._startValue = this._options.startValue;
        this._endValue = this._options.endValue;
      }
    }, {
      key: "_start",
      value: function _start() {
        this._lastTime = 0;
        this._startTime = 0;
        this._deltas = [];

        this._animator = new _Friction(this._options.friction);
        this._isAnimating = true;
        this._startTime = this._lastTime = new Date().getTime();
        this._tick();
      }
    }, {
      key: "_destroy",
      value: function _destroy() {
        window.cancelAnimationFrame(this._requestionAnimationFrameID);
        this._options = null;
      }
    }, {
      key: "_tick",
      value: function _tick() {
        var now = new Date().getTime();
        var delta = (now - this._lastTime) / this._time;
        this._lastTime = now;

        // pass in normalised delta
        var normalisedAnimatedValue = this._animator.step(delta);

        if (this._animator.isFinished() === false) {
          this._nowValue = this._startValue + (this._endValue - this._startValue) * normalisedAnimatedValue;
          this._options.update(this._nowValue);
          this._requestionAnimationFrameID = window.requestAnimationFrame(this._tick.bind(this));
        } else {
          this._nowValue = this._endValue;
          this._options.update(this._nowValue);
          this._options.complete();
          this._isAnimating = false;
        }
      }
    }], [{
      key: "_DEFAULT_OPTIONS",
      get: function () {
        return {
          time: 1000,
          startValue: 0,
          endValue: 1,
          update: function update() {},
          complete: function complete() {},
          friction: 0.1
        };
      }
    }]);

    return Animate;
  })();

  module.exports = Animate;
});