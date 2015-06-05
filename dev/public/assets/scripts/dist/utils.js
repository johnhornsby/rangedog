define(['exports', 'module'], function (exports, module) {
    'use strict';

    var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

    var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

    var Utils = (function () {
        function Utils() {
            _classCallCheck(this, Utils);
        }

        _createClass(Utils, [{
            key: 'extend',
            value: function extend(copyTo, copyFrom) {
                for (var key in copyFrom) {
                    copyTo[key] = copyFrom[key];
                }
                return copyTo;
            }
        }, {
            key: 'sum',
            value: (function (_sum) {
                function sum(_x) {
                    return _sum.apply(this, arguments);
                }

                sum.toString = function () {
                    return _sum.toString();
                };

                return sum;
            })(function (arr) {
                var sum = 0;
                var d = arr.length;
                while (d--) {
                    sum += arr[d];
                }
                return sum;
            })
        }]);

        return Utils;
    })();

    module.exports = new Utils();

    /*
    GLOBALS BELOW
    */
    // request animation frame
    (function () {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        }

        if (!window.cancelAnimationFrame) {
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
        }
    })();
});