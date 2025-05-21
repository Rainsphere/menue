import {
    toggleClass,
    generateUniqueId,
    handleKeyboardActivation,
} from './utils/index.js';

/**
 * Common handler for toggle button clicks
 * @param {Element} button - Toggle button element
 * @param {Element} nav - Navigation element to toggle
 * @param {Object} options - Menu options
 * @param {Function} callback - Callback function
 */
function handleToggleClick(button, nav, options, callback) {
    const isOpen = !button.classList.contains(options.openClass);
    if (nav) {
        toggleClass(button.parentNode, options.openClass, isOpen);
        toggleClass(button, options.openClass, isOpen);
        toggleClass(nav, options.openClass, isOpen);
    }
    callback(button);
}

export function setupMobileToggleListener(menue) {
    const bodyEl = document.querySelector('body'); // More specific

    if (!menue._mobileMenu) return;

    // Ensure mobile menu has an ID for aria-controls
    if (!menue._mobileMenu.id) {
        menue._mobileMenu.id = generateUniqueId('menue-mobile-main-');
    }

    for (let i = 0; i < menue._mobileToggle.length; i++) {
        const toggle = menue._mobileToggle[i];

        // Initial ARIA attributes for the main mobile toggle
        toggle.setAttribute('aria-controls', menue._mobileMenu.id);
        toggle.setAttribute('aria-expanded', 'false'); // Initial state
        toggle.setAttribute('aria-haspopup', 'true'); // Indicates it controls a menu

        if (toggle.tagName.toLowerCase() !== 'button') {
            toggle.setAttribute('role', 'button');
            toggle.setAttribute('tabindex', '0');
        }

        const performToggleAction = function (event) {
            // `this` will be the toggle element
            const isCurrentlyOpen = menue._mobileOpen; // State before action

            if (isCurrentlyOpen) {
                menue._mobileMenu.classList.add(
                    menue.$options.mobileAnimatingClass
                );
                setTimeout(() => {
                    this.classList.remove(menue.$options.openClass);
                    bodyEl.classList.remove(menue.$options.mobileOpenBodyClass);
                    menue._mobileMenu.classList.remove(
                        menue.$options.openClass
                    );
                    menue._mobileMenu.classList.remove(
                        menue.$options.mobileAnimatingClass
                    );
                    menue._mobileOpen = false;
                    this.setAttribute('aria-expanded', 'false'); // Update ARIA
                }, menue.$options.mobileDisplayDelay);
            } else {
                menue._mobileMenu.classList.add(
                    menue.$options.mobileAnimatingClass
                );
                bodyEl.classList.add(menue.$options.mobileOpenBodyClass);
                setTimeout(() => {
                    this.classList.add(menue.$options.openClass);
                    menue._mobileMenu.classList.add(menue.$options.openClass);
                    menue._mobileMenu.classList.remove(
                        menue.$options.mobileAnimatingClass
                    );
                    menue._mobileOpen = true;
                    this.setAttribute('aria-expanded', 'true'); // Update ARIA
                }, menue.$options.mobileDisplayDelay);
            }
            menue.$options.onMobileToggleClick(this, menue);
        };

        toggle.addEventListener('click', performToggleAction);

        if (toggle.tagName.toLowerCase() !== 'button') {
            toggle.addEventListener('keydown', function (event) {
                handleKeyboardActivation(event, performToggleAction);
            });
        }
    }
}

export function setupMobileClasses(menue) {
    const primaryItems = menue._mobileMenu.querySelectorAll(
        `${menue.$options.firstLevelNavSelector} > ul > li`
    );

    primaryItems.forEach((primaryItem, index) => {
        const secondaryNav = primaryItem.querySelector(
            menue.$options.secondLevelNavSelector
        );
        let primaryToggle = primaryItem.querySelector('a'); // Default to anchor
        if (menue.$options.mobileHasSecondaryToggleButton) {
            primaryToggle =
                primaryItem.querySelector(
                    menue.$options.itemToggleButtonClass
                ) || primaryToggle;
        }

        if (secondaryNav && primaryToggle) {
            primaryItem.classList.add(menue.$options.hasSecondaryClass);

            // ARIA for primary toggle
            primaryToggle.setAttribute('aria-haspopup', 'true');
            primaryToggle.setAttribute('aria-expanded', 'false');
            if (primaryToggle.tagName.toLowerCase() !== 'button') {
                primaryToggle.setAttribute('role', 'button');
                primaryToggle.setAttribute('tabindex', '0');
            }

            // ID and ARIA-CONTROLS for secondary nav
            if (!secondaryNav.id) {
                secondaryNav.id = generateUniqueId('menue-secondary-');
            }
            primaryToggle.setAttribute('aria-controls', secondaryNav.id);

            const secondaryItems = secondaryNav.querySelectorAll('ul > li');
            secondaryItems.forEach((secondaryItem, sIndex) => {
                const tertiaryNav = secondaryItem.querySelector(
                    menue.$options.thirdLevelNavSelector
                );
                let secondaryToggle = secondaryItem.querySelector('a'); // Default to anchor
                if (menue.$options.mobileHasTertiaryToggleButton) {
                    secondaryToggle =
                        secondaryItem.querySelector(
                            menue.$options.itemToggleButtonClass
                        ) || secondaryToggle;
                }

                if (tertiaryNav && secondaryToggle) {
                    secondaryItem.classList.add(
                        menue.$options.hasTertiaryClass
                    );

                    // ARIA for secondary toggle
                    secondaryToggle.setAttribute('aria-haspopup', 'true');
                    secondaryToggle.setAttribute('aria-expanded', 'false');
                    if (secondaryToggle.tagName.toLowerCase() !== 'button') {
                        secondaryToggle.setAttribute('role', 'button');
                        secondaryToggle.setAttribute('tabindex', '0');
                    }

                    // ID and ARIA-CONTROLS for tertiary nav
                    if (!tertiaryNav.id) {
                        tertiaryNav.id = generateUniqueId('menue-tertiary-');
                    }
                    secondaryToggle.setAttribute(
                        'aria-controls',
                        tertiaryNav.id
                    );
                }
            });
        }
    });
}

export function setupMobileMenuItemListener(menue) {
    if (!menue._mobileMenu) return;

    // Helper function for click logic, now incorporating ARIA update
    const itemToggleClickHandler = function (eventOrElement, isAnchor = false) {
        const toggleElement = eventOrElement.currentTarget || eventOrElement; // event.currentTarget for event, or element itself
        const parentLi = toggleElement.closest('li');
        if (!parentLi) return;

        const controlledNavSelector = parentLi.classList.contains(
            menue.$options.hasSecondaryClass
        )
            ? menue.$options.secondLevelNavSelector
            : menue.$options.thirdLevelNavSelector;
        const subNav = parentLi.querySelector(controlledNavSelector);

        if (isAnchor) {
            // Anchor-specific logic from original code
            if (
                !parentLi.classList.contains(
                    menue.$options.hasSecondaryClass
                ) &&
                !parentLi.classList.contains(menue.$options.hasTertiaryClass)
            ) {
                // Not a toggle anchor, let it navigate or do its thing
                // Call relevant callback if it exists
                if (parentLi.closest(menue.$options.firstLevelNavSelector)) {
                    menue.$options.onMobilePrimaryAnchorClick(
                        toggleElement,
                        menue
                    );
                } else if (
                    parentLi.closest(menue.$options.secondLevelNavSelector)
                ) {
                    menue.$options.onMobileSecondaryAnchorClick(
                        toggleElement,
                        menue
                    );
                }
                return;
            }

            // It's an anchor acting as a toggle
            if (
                eventOrElement.preventDefault &&
                (parentLi.classList.contains(
                    menue.$options.hasSecondaryClass
                ) ||
                    parentLi.classList.contains(
                        menue.$options.hasTertiaryClass
                    ))
            ) {
                eventOrElement.preventDefault();
            }

            const currentlyOpen = toggleElement.classList.contains(
                menue.$options.openClass
            );
            const shouldOpen =
                !currentlyOpen &&
                (parentLi.classList.contains(
                    menue.$options.hasSecondaryClass
                ) ||
                    parentLi.classList.contains(
                        menue.$options.hasTertiaryClass
                    ));

            // Reset others (simplified, might need more specific scoping like original)
            const allAnchors = menue._mobileMenu.querySelectorAll('a');
            allAnchors.forEach(a => {
                if (a !== toggleElement)
                    a.classList.remove(menue.$options.openClass);
                // also remove open from parent LIs and subnavs if needed for accordion style
            });
            const allSubNavs = menue._mobileMenu.querySelectorAll(
                `${menue.$options.secondLevelNavSelector}, ${menue.$options.thirdLevelNavSelector}`
            );
            allSubNavs.forEach(sn => {
                if (sn !== subNav)
                    sn.classList.remove(menue.$options.openClass);
            });

            if (shouldOpen && subNav) {
                toggleElement.classList.add(menue.$options.openClass);
                subNav.classList.add(menue.$options.openClass);
                toggleElement.setAttribute('aria-expanded', 'true');
            } else {
                // Closing or already closed
                toggleElement.classList.remove(menue.$options.openClass);
                if (subNav) subNav.classList.remove(menue.$options.openClass);
                toggleElement.setAttribute('aria-expanded', 'false');
            }
            // Call relevant callback
            if (parentLi.closest(menue.$options.firstLevelNavSelector)) {
                menue.$options.onMobilePrimaryAnchorClick(toggleElement, menue);
            } else if (
                parentLi.closest(menue.$options.secondLevelNavSelector)
            ) {
                menue.$options.onMobileSecondaryAnchorClick(
                    toggleElement,
                    menue
                );
            }
        } else {
            // Button toggle logic (uses global handleToggleClick from utils)
            if (subNav) {
                // Pass event to handleToggleClick
                handleToggleClick(eventOrElement, menue.$options, toggle => {
                    if (
                        parentLi.classList.contains(
                            menue.$options.hasSecondaryClass
                        )
                    ) {
                        menue.$options.onMobilePrimaryToggleClick(
                            toggle,
                            menue
                        );
                    } else if (
                        parentLi.classList.contains(
                            menue.$options.hasTertiaryClass
                        )
                    ) {
                        // Assuming this is for tertiary
                        menue.$options.onMobileSecondaryToggleClick(
                            toggle,
                            menue
                        );
                    }
                });
            }
        }
    };

    // Primary Toggles / Anchors
    if (menue.$options.mobileHasSecondaryToggleButton) {
        const primaryToggleButtons = menue._mobileMenu.querySelectorAll(
            `${menue.$options.firstLevelNavSelector} > ul > li > ${menue.$options.itemToggleButtonClass}`
        );
        primaryToggleButtons.forEach(button => {
            button.addEventListener('click', itemToggleClickHandler);
            if (button.tagName.toLowerCase() !== 'button') {
                // Should have role="button" from setupMobileClasses
                button.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, itemToggleClickHandler);
                });
            }
        });
    } else {
        const primaryAnchors = menue._mobileMenu.querySelectorAll(
            `${menue.$options.firstLevelNavSelector} > ul > li > a`
        );
        primaryAnchors.forEach(anchor => {
            anchor.addEventListener('click', function (event) {
                itemToggleClickHandler(event, true);
            });
            // Anchors acting as toggles should have role="button" from setupMobileClasses
            if (anchor.getAttribute('role') === 'button') {
                anchor.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, function (e) {
                        itemToggleClickHandler(e, true);
                    });
                });
            }
        });
    }

    // Secondary Toggles / Anchors (for tertiary nav)
    if (menue.$options.mobileHasTertiaryToggleButton) {
        const secondaryToggleButtons = menue._mobileMenu.querySelectorAll(
            `${menue.$options.secondLevelNavSelector} > ul > li > ${menue.$options.itemToggleButtonClass}`
        );
        secondaryToggleButtons.forEach(button => {
            button.addEventListener('click', itemToggleClickHandler);
            if (button.tagName.toLowerCase() !== 'button') {
                // Should have role="button"
                button.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, itemToggleClickHandler);
                });
            }
        });
    } else {
        const secondaryAnchors = menue._mobileMenu.querySelectorAll(
            `${menue.$options.secondLevelNavSelector} > ul > li > a`
        );
        secondaryAnchors.forEach(anchor => {
            anchor.addEventListener('click', function (event) {
                itemToggleClickHandler(event, true);
            });
            if (anchor.getAttribute('role') === 'button') {
                // Anchors acting as toggles
                anchor.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, function (e) {
                        itemToggleClickHandler(e, true);
                    });
                });
            }
        });
    }
}

export function removeMobileToggleListener(menue) {
    for (var i = 0; i < menue._mobileToggle.length; i++) {
        menue._mobileToggle[i].removeEventListener('click');
    }
}
