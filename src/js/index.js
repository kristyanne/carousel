'use strict';

var DOMUtils = require('./utils/dom');

class Carousel {
    constructor( options ) {
        const defaults = {
            selector: '[data-carousel]',
            slideSelector: '[data-carousel-slide]'
        };

        Object.assign(this, defaults, options);

        // Cache the carousel and slide DOM elements.
        this.carousel = document.querySelectorAll(this.selector)[0];
        this.slides = this.carousel.querySelectorAll(this.slideSelector);

        // Intialise the current slide index.
        this.currentSlide = 0;

        // Intialise the CSS class prefix.
        this.cssPrefix = 'cs-carousel';

        this.maxSlideIndex = this.slides.length - 1;
        this.maxSlideIndex
    }

    render() {
        // Add a class to the main carousel node.
        this.carousel.classList.add(this.cssPrefix);

        // Add a class to each of the slides.
        this.slides.forEach(slide => slide.classList.add(this.cssPrefix + '-slide'));

        // Create the slides wrapper node.
        let slideWrapper = document.createElement('div');
        slideWrapper.classList.add(this.cssPrefix + '-slides');

        DOMUtils.wrapAll(this.slides, slideWrapper);

        // Create the main carousel wrapper node.
        let wrapper = document.createElement('div');
        wrapper.classList.add(this.cssPrefix + '-wrapper');

        DOMUtils.wrap(slideWrapper, wrapper);
    }
}




/**
 * TODO: SEPERATE THIS OUT.
 */

var element = document.getElementById('carousel');
var c = new Carousel();

c.render();
