// chronos.js
// version : 0.1.0
// author : Enrico Spinielli
// license : MIT
// chronosjs.com

(function(_) {

	 var BOGUS = "bogus";

    function quotient(m, n) {
	     return Math.floor(m / n);
	 };

	 function mod(a, b) {
	     return a - (b * quotient(a, b));
	 };

	 function amod(a, b) {
	     return b + mod(a, -b);
	 };

    function next(index, predicate) {
        if (predicate(index)) {
            return index;
        }
        else {
            return next(index + 1, predicate);
        }
    };

    function final(index, predicate) {
        if (! predicate(index)) {
            return index - 1;
        }
        else {
            return final(index + 1, predicate);
        }
    };

    function sum(expression, index, predicate) {
        if (! predicate(index)) {
            return 0;
        }
        else {
            return expression(index) + sum(expression, index + 1, predicate);
        }
    };

    function binary_search(low, high, dir, condition) {
        var mid = (low + high) / 2;
        if (dir(low, high)) {
            return mid;
        }
        else if (condition(mid)) {
            return binary_search(low, mid, dir, condition);
        }
        else {
            return binary_search(mid, high, dir, condition);
        }
    };

    function invert_angular(func, y, low, high) {
        var precision = Math.pow(10, -5);
        return binary_search(low, high,
                            function(l, h) {return (h - l) <= precision;},
                            function(x) {return mod(func(x) - y, 360) < 180;});
    };

	 /************************************
     Exposing Chronos
	  ************************************/
	 // CommonJS module is defined
    // check for nodeJS
	 var  hasModule = (typeof module !== 'undefined' && module.exports);
	 if (hasModule) {
        module.exports = chronos;
	 }
	 /*global ender:false */
	 if (typeof ender === 'undefined') {
        // here, `this` means `window` in the browser, or `global` on the server
        // add `chronos` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        this['chronos'] = chronos;
	 }
	 /*global define:false */
	 if (typeof define === "function" && define.amd) {
        define("chronos", [], function () {
		      return chronos;
        });
	 }

    chronos.version = "0.0.1";
    chronos.quotient = quotient;
    chronos.mod = mod;
    chronos.amod = amod;
    chronos.next = next;
    chronos.final = final;
    chronos.sum = sum;
    chronos.binary_search = binary_search;
    _.chronos = chronos;
})(this);
