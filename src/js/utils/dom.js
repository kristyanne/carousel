module.exports = (() => {
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
        wrap(element, wrapper) {
            element.parentNode.insertBefore(wrapper, element);
            wrapper.appendChild(element);
        },

        /**
         * As above but works for wrapping multiple elements.
         *
         * @param elements [array of DOM Nodes to be wrapped]
         * @param wrapper  [DOM Node for the new wrapper]
         */
        wrapAll(elements, wrapper) {
            elements[0].parentNode.insertBefore(wrapper, elements[0]);
            elements.forEach(x => wrapper.appendChild(x));
        }
    }
})();
