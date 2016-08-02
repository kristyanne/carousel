'use strict';

var DOMUtils = require('./utils/dom');

class Carousel {
    constructor( options ) {
        const defaults = {
            selector: '[data-carousel]',
            slideSelector: '[data-carousel-slide]',
            prevBtn: '[data-carousel-prev]',
            nextBtn: '[data-carousel-next]',
            infinite: false,
            pagination: true
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

        // Create the pagination nodes.
        if(this.pagination) {
            this.buildPagination();
        }

        // Register click events.
        this.bindEvents();
    }

    buildPagination() {
        let wrapper = document.createElement('ol');
        wrapper.classList.add(this.cssPrefix + '-pagination');

        this.carousel.appendChild(wrapper);

        this.slides.forEach((slide, index) => {
            let li = document.createElement('li');
            li.classList.add(this.cssPrefix + '-pagination-item');
            li.innerHTML = `<button data-index="${index}">${index + 1}</button>`;

            li.addEventListener('click', () => this.moveToIndex(index));

            wrapper.appendChild(li);
        });
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

    maxReached(index) {
        let i = index || this.currentSlide;
        return i === this.slideCount;
    }

    minReached(index) {
        let i = index || this.currentSlide;
        return i <= 0;
    }

    /**
     * Move to the previous slide.
     *
     */
    movePrev() {
        let minReached = this.minReached(this.currentSlide - 1);
        let i = (minReached && this.infinite) ? this.slideCount - 1 : this.currentSlide - 1;

        this.moveToIndex(i);
    }

    /**
     * Move to the next slide.
     */
    moveNext() {
        let maxReached = this.maxReached(this.currentSlide + 1);
        let i = (maxReached && this.infinite) ? 0 : this.currentSlide + 1;

        this.moveToIndex(i);
    }

    /**
     * Move to a slide by index
     * @param  {int} index [index of the slide to move to]
     */
    moveToIndex(index) {
        // Validate the slide index.
        if(index < 0 || index >= this.slideCount) {
            console.error('invalid slide index: ' + index);
            return;
        }

        var w = (this.carousel.clientWidth * index);
        this.slideWrapper.style.left = -w + 'px';

        this.currentSlide = index;
    }
}




/**
 * TODO: SEPERATE THIS OUT.
 */

var element = document.getElementById('carousel');
var c = new Carousel({
    infinite: true
});

c.render();
