define(['exports'], function (exports) {
  'use strict';

  var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  var FrictionAnimator = (function () {
    function FrictionAnimator() {
      _classCallCheck(this, FrictionAnimator);

      this.velocity = 0;
      this.friction = 0.1;
      this.acceleration = 0;
      this.destination = 100;
      this.previousX = 0;
      this.x = 0;
      this.elem = document.getElementsByClassName('block')[0];
      this.startAnimation();
    }

    _createClass(FrictionAnimator, [{
      key: 'startAnimation',
      value: function startAnimation() {
        // calcuates the initial acceleration based on the distance and the friction.
        this.acceleration = (this.destination - this.x) * this.friction;
        this.velocity = 0;
        this.animate();
      }
    }, {
      key: 'animate',
      value: function animate() {

        this.velocity += this.acceleration;
        this.x += this.velocity;

        console.log('acceleration ' + this.acceleration + ' velocity ' + this.velocity);

        this.velocity *= 1 - this.friction;

        this.elem.style.webkitTransform = 'translate3d(' + this.x + 'px,0, 0)';

        if (Math.round(this.velocity * 100) > 0) {
          requestAnimationFrame(this.animate.bind(this));
        } else {
          this.elem.style.webkitTransform = 'translate3d(' + this.destination + 'px,0, 0)';
        }

        // reset the acceleration as this is set initially
        this.acceleration = 0;

        this.previousX = this.x;
      }
    }]);

    return FrictionAnimator;
  })();
});
//# sourceMappingURL=frictionanimator.js.map