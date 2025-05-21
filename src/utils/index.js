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

let uniqueIdCounter = 0;
/**
 * Generates a unique ID with a given prefix.
 * @param {string} prefix - The prefix for the ID.
 * @returns {string} A unique ID string.
 */
export function generateUniqueId(prefix = 'menue-id-') {
    return `${prefix}${uniqueIdCounter++}`;
}

/**
 * Handles keyboard activation for non-button elements acting as buttons.
 * Triggers a click handler if 'Enter' or 'Space' is pressed.
 * @param {KeyboardEvent} event - The keyboard event.
 * @param {Function} clickHandlerFunction - The function to call as if a click occurred.
 */
export function handleKeyboardActivation(event, clickHandlerFunction) {
    if (event.key === 'Enter' || event.key === ' ') {
        // ' ' for Spacebar
        event.preventDefault(); // Prevent default action (e.g., scrolling for space)
        // If the clickHandlerFunction expects an event object, pass it.
        // If it's a simple function call, clickHandlerFunction() might be enough.
        // For consistency with click events, it's often good to simulate the event context if possible,
        // or ensure clickHandlerFunction can be called directly.
        // Here, we assume the clickHandler can be called directly or implicitly uses `this` or `event.currentTarget`.
        // For simplicity, we'll call it directly. If context is needed, it must be bound or passed.
        clickHandlerFunction.call(event.currentTarget, event); // Call with currentTarget as `this` and pass event
    }
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

    const toggle =
        eventOrElement instanceof Event
            ? eventOrElement.currentTarget
            : eventOrElement;

    if (eventOrElement instanceof Event) {
        eventOrElement.preventDefault();
    }

    if (!toggle) return;

    const parentNode = toggle.parentNode;
    const secondaryNav = parentNode.querySelector(
        options.secondLevelNavSelector
    );

    if (!secondaryNav) return;

    const isOpen = toggle.classList.contains(options.openClass); // State *before* toggle
    const newStateOpen = !isOpen; // State *after* toggle

    if (newStateOpen) {
        parentNode.classList.add(options.openClass);
        toggle.classList.add(options.openClass);
        secondaryNav.classList.add(options.openClass);
    } else {
        parentNode.classList.remove(options.openClass);
        toggle.classList.remove(options.openClass);
        secondaryNav.classList.remove(options.openClass);
    }
    // Update ARIA expanded state on the toggle
    toggle.setAttribute('aria-expanded', newStateOpen.toString());

    if (typeof callback === 'function') {
        callback(toggle);
    }
}
