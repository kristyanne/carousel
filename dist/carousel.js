(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMUtils = require('./utils/dom');

var Carousel = function () {
    function Carousel(options) {
        _classCallCheck(this, Carousel);

        var defaults = {
            selector: '[data-carousel]',
            slideSelector: '[data-carousel-slide]',
            prevBtn: '[data-carousel-prev]',
            nextBtn: '[data-carousel-next]'
        };

        Object.assign(this, defaults, options);

        // Cache the carousel and slide DOM elements.
        this.carousel = document.querySelectorAll(this.selector)[0];
        this.slides = this.carousel.querySelectorAll(this.slideSelector);

        // Cache the prev/next nodes.
        this.prevBtn = document.querySelectorAll(this.prevBtn);
        this.nextBtn = document.querySelectorAll(this.nextBtn);

        // Define some config settings.
        this.slideCount = this.slides.length;
        this.currentSlide = 0;
        this.cssPrefix = 'cs-carousel';

        console.log(this);
    }

    _createClass(Carousel, [{
        key: 'render',
        value: function render() {
            var _this = this;

            // Add a class to the main carousel node.
            this.carousel.classList.add(this.cssPrefix);

            // Add a class to each of the slides.
            this.slides.forEach(function (slide) {
                return slide.classList.add(_this.cssPrefix + '-slide');
            });

            // Create the slides wrapper node.
            this.slideWrapper = document.createElement('div');
            this.slideWrapper.classList.add(this.cssPrefix + '-slides');

            DOMUtils.wrapAll(this.slides, this.slideWrapper);

            // Create the main carousel wrapper node.
            var wrapper = document.createElement('div');
            wrapper.classList.add(this.cssPrefix + '-wrapper');

            DOMUtils.wrap(this.slideWrapper, wrapper);

            // Add classes to the prev/next nodes.
            this.prevBtn.forEach(function (el) {
                el.classList.add(_this.cssPrefix + '-prev');
            });
            this.nextBtn.forEach(function (el) {
                el.classList.add(_this.cssPrefix + '-next');
            });

            // Register click events.
            this.bindEvents();
        }
    }, {
        key: 'checkPrevNext',
        value: function checkPrevNext() {
            var _this2 = this;

            if (this.currentSlide === 0) {
                this.prevBtn.forEach(function (el) {
                    el.classList.add(_this2.cssPrefix + '-min-reached');
                });
            } else {
                this.prevBtn.forEach(function (el) {
                    el.classList.remove(_this2.cssPrefix + '-min-reached');
                });
            }
        }

        /**
         * @return {[type]} [description]
         */

    }, {
        key: 'bindEvents',
        value: function bindEvents() {
            var _this3 = this;

            // [1]
            this.prevBtn.forEach(function (el) {
                el.addEventListener('click', function () {
                    return _this3.movePrev();
                });
            });

            // [2]
            this.nextBtn.forEach(function (el) {
                el.addEventListener('click', function () {
                    return _this3.moveNext();
                });
            });
        }
    }, {
        key: 'movePrev',
        value: function movePrev() {
            this.moveToIndex(this.currentSlide - 1);
        }
    }, {
        key: 'moveNext',
        value: function moveNext() {
            this.moveToIndex(this.currentSlide + 1);
        }
    }, {
        key: 'moveToIndex',
        value: function moveToIndex(index) {
            if (index < 0 || index >= this.slideCount) {
                return;
            }

            var w = this.carousel.clientWidth * index;
            this.slideWrapper.style.left = -w + 'px';

            this.currentSlide = index;

            this.checkPrevNext();
        }
    }]);

    return Carousel;
}();

/**
 * TODO: SEPERATE THIS OUT.
 */

var element = document.getElementById('carousel');
var c = new Carousel();

c.render();

},{"./utils/dom":2}],2:[function(require,module,exports){
"use strict";

module.exports = function () {
    return {
        /**
         * Wrap an element in another element.
         * @param element [DOM Node to be wrapped]
         * @param parent  [DOM Node for the new wrapper]
         *
         * Usage:
         * <p id="el"></p>
         *
         * var el = document.getElementById('el');
         * wrap(el, document.createElement('<div>'))l
         *
         * Output:
         * <div><p id="el"></p></div>
         */
        wrap: function wrap(element, wrapper) {
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        },


        /**
         * As above but works for wrapping multiple elements.
         *
         * @param elements [array of DOM Nodes to be wrapped]
         * @param wrapper  [DOM Node for the new wrapper]
         */
        wrapAll: function wrapAll(elements, wrapper) {
            elements[0].parentNode.insertBefore(wrapper, elements[0]);
            elements.forEach(function (x) {
                return wrapper.appendChild(x);
            });
        }
    };
}();

},{}]},{},[1]);
