import {
    handleToggleClick,
    generateUniqueId,
    handleKeyboardActivation,
} from './utils/index.js';

export function setupDesktopMenuItemListener(menue) {
    const {
        itemToggleButtonClass,
        firstLevelNavSelector,
        secondLevelNavSelector,
        thirdLevelNavSelector,
        desktopHasSecondaryToggleButton,
        desktopHasTertiaryToggleButton,
        openClass, // Needed for click handlers
    } = menue.$options;

    if (!menue._desktopMenu) return;

    // Initial ARIA setup
    const primaryItems = menue._desktopMenu.querySelectorAll(
        `${firstLevelNavSelector} > ul > li`
    );

    primaryItems.forEach(primaryItem => {
        const secondaryNav = primaryItem.querySelector(secondLevelNavSelector);
        let primaryToggle = null;

        if (desktopHasSecondaryToggleButton) {
            primaryToggle = primaryItem.querySelector(
                `:scope > ${itemToggleButtonClass}`
            );
        } else {
            // If no button, the anchor itself might be the toggle (though less common for desktop dropdowns)
            // For this implementation, we'll assume if !desktopHasSecondaryToggleButton, direct anchors are not acting as dropdown toggles.
            // If anchors were toggles, they'd need this ARIA setup too.
            // This part might need refinement based on how non-button toggles are structured in desktop.
        }

        if (primaryToggle && secondaryNav) {
            primaryToggle.setAttribute('aria-haspopup', 'true');
            primaryToggle.setAttribute('aria-expanded', 'false');
            if (primaryToggle.tagName.toLowerCase() !== 'button') {
                primaryToggle.setAttribute('role', 'button');
                primaryToggle.setAttribute('tabindex', '0');
            }
            if (!secondaryNav.id) {
                secondaryNav.id = generateUniqueId('menue-desktop-secondary-');
            }
            primaryToggle.setAttribute('aria-controls', secondaryNav.id);
        }

        if (secondaryNav) {
            const secondaryItems =
                secondaryNav.querySelectorAll(':scope > ul > li');
            secondaryItems.forEach(secondaryItem => {
                const tertiaryNav = secondaryItem.querySelector(
                    thirdLevelNavSelector
                );
                let secondaryToggle = null;

                if (desktopHasTertiaryToggleButton) {
                    secondaryToggle = secondaryItem.querySelector(
                        `:scope > ${itemToggleButtonClass}`
                    );
                }
                // Similar logic for anchors if they can be tertiary toggles

                if (secondaryToggle && tertiaryNav) {
                    secondaryToggle.setAttribute('aria-haspopup', 'true');
                    secondaryToggle.setAttribute('aria-expanded', 'false');
                    if (secondaryToggle.tagName.toLowerCase() !== 'button') {
                        secondaryToggle.setAttribute('role', 'button');
                        secondaryToggle.setAttribute('tabindex', '0');
                    }
                    if (!tertiaryNav.id) {
                        tertiaryNav.id = generateUniqueId(
                            'menue-desktop-tertiary-'
                        );
                    }
                    secondaryToggle.setAttribute(
                        'aria-controls',
                        tertiaryNav.id
                    );
                }
            });
        }
    });

    // Event Listeners
    if (desktopHasSecondaryToggleButton) {
        const primaryToggleButtons = menue._desktopMenu.querySelectorAll(
            `${firstLevelNavSelector} > ul > li > ${itemToggleButtonClass}`
        );

        primaryToggleButtons.forEach(button => {
            // Click listener is already using handleToggleClick from utils,
            // which will be updated for aria-expanded.
            // Click listener is already using handleToggleClick from utils,
            // which will be updated for aria-expanded.
            const primaryToggleClickHandler = function (event) {
                handleToggleClick(event, menue.$options, function (toggle) {
                    menue.$options.onDesktopPrimaryToggleClick(toggle, menue);
                });
            };
            button.addEventListener('click', primaryToggleClickHandler);
            if (button.getAttribute('role') === 'button') {
                button.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, primaryToggleClickHandler);
                });
            }
        });
    }

    if (desktopHasTertiaryToggleButton) {
        const secondaryToggleButtons = menue._desktopMenu.querySelectorAll(
            `${secondLevelNavSelector} > ul > li > ${itemToggleButtonClass}`
        );
        secondaryToggleButtons.forEach(secToggleButton => {
            const tertiaryToggleClickHandler = function () {
                // `this` will be secToggleButton
                const parentLi = this.closest('li');
                const tertiaryNav = parentLi
                    ? parentLi.querySelector(thirdLevelNavSelector)
                    : null;

                if (tertiaryNav) {
                    const isOpen = this.classList.contains(openClass);
                    const newState = !isOpen;

                    // toggleClass is not imported in desktop.js, assuming it's a global or needs import.
                    // For now, directly manage classes. If toggleClass from utils is intended, it needs to be imported.
                    // Let's assume direct class manipulation for now as per original structure for tertiary toggles.
                    if (newState) {
                        parentLi.classList.add(openClass);
                        this.classList.add(openClass);
                        tertiaryNav.classList.add(openClass);
                    } else {
                        parentLi.classList.remove(openClass);
                        this.classList.remove(openClass);
                        tertiaryNav.classList.remove(openClass);
                    }
                    this.setAttribute('aria-expanded', newState.toString());
                }
                menue.$options.onDesktopSecondaryToggleClick(this, menue);
            };

            secToggleButton.addEventListener(
                'click',
                tertiaryToggleClickHandler
            );
            if (secToggleButton.getAttribute('role') === 'button') {
                secToggleButton.addEventListener('keydown', function (event) {
                    handleKeyboardActivation(event, tertiaryToggleClickHandler);
                });
            }
        });
    }
}
