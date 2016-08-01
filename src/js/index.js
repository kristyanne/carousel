'use strict';

var DOMUtils = require('./utils/dom');

class Carousel {
    constructor( options ) {
        const defaults = {
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

        console.log( this );
    }

    render() {
        // Add a class to the main carousel node.
        this.carousel.classList.add(this.cssPrefix);

        // Add a class to each of the slides.
        this.slides.forEach(slide => slide.classList.add(this.cssPrefix + '-slide'));

        // Create the slides wrapper node.
        this.slideWrapper = document.createElement('div');
        this.slideWrapper.classList.add(this.cssPrefix + '-slides');

        DOMUtils.wrapAll(this.slides, this.slideWrapper);

        // Create the main carousel wrapper node.
        let wrapper = document.createElement('div');
        wrapper.classList.add(this.cssPrefix + '-wrapper');

        DOMUtils.wrap(this.slideWrapper, wrapper);

        // Add classes to the prev/next nodes.
        this.prevBtn.forEach(el => { el.classList.add(this.cssPrefix + '-prev'); });
        this.nextBtn.forEach(el => { el.classList.add(this.cssPrefix + '-next'); });

        // Register click events.
        this.bindEvents();
    }

    checkPrevNext() {
        // THIS IS LONG - REFACTOR THIS.
        if(this.currentSlide === 0) {
            this.prevBtn.forEach(el => {
                el.classList.add(this.cssPrefix + '-min-reached');
            });
        } else {
            this.prevBtn.forEach(el => {
                el.classList.remove(this.cssPrefix + '-min-reached');
            });
        }
    }

    /**
     * @return {[type]} [description]
     */
    bindEvents() {
        // [1]
        this.prevBtn.forEach(el => {
            el.addEventListener('click', () => this.movePrev());
        });

        // [2]
        this.nextBtn.forEach(el => {
            el.addEventListener('click', () => this.moveNext());
        });
    }

    movePrev() {
        this.moveToIndex(this.currentSlide - 1);
    }

    moveNext() {
        this.moveToIndex(this.currentSlide + 1);
    }

    moveToIndex(index) {
        if(index < 0 || index >= this.slideCount) {
            return;
        }

        var w = (this.carousel.clientWidth * index);
        this.slideWrapper.style.left = -w + 'px';

        this.currentSlide = index;

        this.checkPrevNext();
    }
}




/**
 * TODO: SEPERATE THIS OUT.
 */

var element = document.getElementById('carousel');
var c = new Carousel();

c.render();
