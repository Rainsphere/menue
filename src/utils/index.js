/**
 * Merges two objects, copying properties from options into target
 * @param {Object} target - Base object
 * @param {Object} options - Properties to merge
 * @returns {Object} Combined object
 */
export function extend(target, options) {
    var prop,
        extended = {};
    for (prop in target) {
        if (Object.prototype.hasOwnProperty.call(target, prop)) {
            extended[prop] = target[prop];
        }
    }
    for (prop in options) {
        if (Object.prototype.hasOwnProperty.call(options, prop)) {
            extended[prop] = options[prop];
        }
    }
    return extended;
}

/**
 * Toggle classes on an element
 * @param {Element} element - DOM element
 * @param {string} className - Class to toggle
 * @param {boolean} force - Force add/remove
 */
export function toggleClass(element, className, force) {
    if (force === true) element.classList.add(className);
    else if (force === false) element.classList.remove(className);
    else element.classList.toggle(className);
}

/**
 * Find closest parent matching selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector
 * @returns {Element|null}
 */
export function closest(element, selector) {
    return element.closest(selector);
}

/**
 * Handle toggle click events
 * @param {Event|Element} eventOrElement - Click event or DOM element
 * @param {Object} options - Options containing selectors and classes
 * @param {Function} callback - Callback function to execute after toggle
 */
export function handleToggleClick(eventOrElement, options, callback) {
    if (!eventOrElement || !options) return;

    const toggle = eventOrElement instanceof Event ? 
        eventOrElement.currentTarget : 
        eventOrElement;
    
    if (eventOrElement instanceof Event) {
        eventOrElement.preventDefault();
    }

    if (!toggle) return;

    const parentNode = toggle.parentNode;
    const secondaryNav = parentNode.querySelector(options.secondLevelNavSelector);

    if (!secondaryNav) return;

    const isOpen = toggle.classList.contains(options.openClass);

    if (!isOpen) {
        parentNode.classList.add(options.openClass);
        toggle.classList.add(options.openClass);
        secondaryNav.classList.add(options.openClass);
    } else {
        parentNode.classList.remove(options.openClass);
        toggle.classList.remove(options.openClass);
        secondaryNav.classList.remove(options.openClass);
    }

    if (typeof callback === 'function') {
        callback(toggle);
    }
}
