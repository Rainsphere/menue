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
