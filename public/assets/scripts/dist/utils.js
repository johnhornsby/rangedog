define(["exports"], function (exports) {

    // var lastTime = 0;
    // var vendors = ['ms', 'moz', 'webkit', 'o'];
    // for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    //     window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    //     window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
    //                                || window[vendors[x]+'CancelRequestAnimationFrame'];
    // }

    // if (!window.requestAnimationFrame) {
    //     window.requestAnimationFrame = function(callback, element) {
    //         var currTime = new Date().getTime();
    //         var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    //         var id = window.setTimeout(function() { callback(currTime + timeToCall); },
    //           timeToCall);
    //         lastTime = currTime + timeToCall;
    //         return id;
    //     };
    // }

    // if (!window.cancelAnimationFrame) {
    //     window.cancelAnimationFrame = function(id) {
    //         clearTimeout(id);
    //     };
    // }

    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.extend = extend;
    exports.sum = sum;

    function extend(copyTo, copyFrom) {
        for (var key in copyFrom) {
            copyTo[key] = copyFrom[key];
        }
        return copyTo;
    }

    function sum(arr) {
        var sum = 0;
        var d = arr.length;
        while (d--) {
            sum += arr[d];
        }
        return sum;
    }
});
//# sourceMappingURL=utils.js.map