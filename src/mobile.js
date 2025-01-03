import { toggleClass } from './utils/index.js';

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
    var bodyEl = document.querySelectorAll('body')[0];

    for (var i = 0; i < menue._mobileToggle.length; i++) {
        var toggle = menue._mobileToggle[i];
        toggle.addEventListener('click', function () {
            var thisToggle = this;
            if (menue._mobileOpen) {
                menue._mobileMenu.classList.add(
                    menue.$options.mobileAnimatingClass
                );
                setTimeout(function () {
                    thisToggle.classList.remove(menue.$options.openClass);
                    bodyEl.classList.remove(menue.$options.mobileOpenBodyClass);
                    menue._mobileMenu.classList.remove(
                        menue.$options.openClass
                    );
                    menue._mobileMenu.classList.remove(
                        menue.$options.mobileAnimatingClass
                    );
                    menue._mobileOpen = false;
                }, menue.$options.mobileDisplayDelay);
            } else {
                menue._mobileMenu.classList.add(
                    menue.$options.mobileAnimatingClass
                );
                bodyEl.classList.add(menue.$options.mobileOpenBodyClass);
                setTimeout(function () {
                    thisToggle.classList.add(menue.$options.openClass);
                    menue._mobileMenu.classList.add(menue.$options.openClass);
                    menue._mobileMenu.classList.remove(
                        menue.$options.mobileAnimatingClass
                    );
                    menue._mobileOpen = true;
                }, menue.$options.mobileDisplayDelay);
            }
            menue.$options.onMobileToggleClick(this, menue);
        });
    }
}

export function setupMobileClasses(menue) {
    var primaryItems = menue._mobileMenu.querySelectorAll(
        menue.$options.firstLevelNavSelector + ' > ul > li'
    );

    //check for secondary nav
    for (var i = 0; i < primaryItems.length; i++) {
        var secondaryItem = primaryItems[i].querySelector(
            menue.$options.secondLevelNavSelector
        );
        if (secondaryItem) {
            //we have secondary nav
            primaryItems[i].classList.add(menue.$options.hasSecondaryClass);
            //check for tertiary nav
            var secondaryItems = secondaryItem.querySelectorAll('ul > li');
            for (var j = 0; j < secondaryItems.length; j++) {
                var tertiaryItem = secondaryItems[j].querySelector(
                    menue.$options.thirdLevelNavSelector
                );
                if (tertiaryItem) {
                    secondaryItems[j].classList.add(
                        menue.$options.hasTertiaryClass
                    );
                }
            }
        }
    }
}

export function setupMobileMenuItemListener(menue) {
    if (menue.$options.mobileHasSecondaryToggleButton) {
        const primaryToggleButtons = menue._mobileMenu.querySelectorAll(
            `${menue.$options.firstLevelNavSelector} > ul > li > ${menue.$options.itemToggleButtonClass}`
        );

        primaryToggleButtons.forEach(button => {
            button.addEventListener('click', function () {
                const secondaryNav = this.parentNode.querySelector(
                    menue.$options.secondLevelNavSelector
                );
                handleToggleClick(this, secondaryNav, menue.$options, toggle =>
                    menue.$options.onMobilePrimaryToggleClick(toggle, menue)
                );
            });
        });
    } else {
        //Listen for anchor clicks to open/close the secondary-nav
        var primaryAnchors = menue._mobileMenu.querySelectorAll(
            menue.$options.firstLevelNavSelector + ' > ul > li > a'
        );
        for (var a = 0; a < primaryAnchors.length; a++) {
            var anchor = primaryAnchors[a];
            anchor.addEventListener('click', function (event) {
                var resetAll = function () {
                    for (var j = 0; j < primaryAnchors.length; j++) {
                        primaryAnchors[j].classList.remove(
                            menue.$options.openClass
                        );
                    }

                    var allSecondaryNavs = menue._mobileMenu.querySelectorAll(
                        menue.$options.secondLevelNavSelector
                    );
                    for (var k = 0; k < allSecondaryNavs.length; k++) {
                        allSecondaryNavs[k].classList.remove(
                            menue.$options.openClass
                        );
                    }
                };

                if (
                    !this.classList.contains(menue.$options.openClass) &&
                    this.parentNode.classList.contains(
                        menue.$options.hasSecondaryClass
                    )
                ) {
                    event.preventDefault();
                    resetAll();

                    var secondaryNav = this.parentNode.querySelector(
                        menue.$options.secondLevelNavSelector
                    );
                    if (secondaryNav) {
                        this.classList.add(menue.$options.openClass);
                        secondaryNav.classList.add(menue.$options.openClass);
                    }
                } else {
                    resetAll();
                }
                this.options.onMobilePrimaryAnchorClick(this, menue);
            });
        }
    }
    if (menue.$options.mobileHasTertiaryToggleButton) {
        //Listen for close button clicks to open/close the tertiary-nav
        var secondaryToggleButtons = menue._mobileMenu.querySelectorAll(
            menue.$options.secondLevelNavSelector +
                ' > ul > li > ' +
                menue.$options.itemToggleButtonClass
        );
        for (var l = 0; l < secondaryToggleButtons.length; l++) {
            var secTogButton = secondaryToggleButtons[l];
            secTogButton.addEventListener('click', function () {
                var tertiaryNav = this.parentNode.querySelector(
                    menue.$options.thirdLevelNavSelector
                );
                if (!this.classList.contains(menue.$options.openClass)) {
                    if (tertiaryNav) {
                        this.parentNode.classList.add(menue.$options.openClass);
                        this.classList.add(menue.$options.openClass);
                        tertiaryNav.classList.add(menue.$options.openClass);
                    }
                } else {
                    if (tertiaryNav) {
                        this.parentNode.classList.remove(
                            menue.$options.openClass
                        );
                        this.classList.remove(menue.$options.openClass);
                        tertiaryNav.classList.remove(menue.$options.openClass);
                    }
                }
                menue.$options.onMobileSecondaryToggleClick(this, menue);
            });
        }
    } else {
        //Listen for anchor clicks to open/close the tertiary-nav
        var secondaryAnchors = menue._mobileMenu.querySelectorAll(
            menue.$options.secondLevelNavSelector + ' > ul > li > a'
        );

        for (var m = 0; m < secondaryAnchors.length; m++) {
            var secAnchor = secondaryAnchors[m];
            secAnchor.addEventListener('click', function (event) {
                var resetAll = function () {
                    for (var j = 0; j < secondaryAnchors.length; j++) {
                        secondaryAnchors[j].classList.remove(
                            menue.$options.openClass
                        );
                    }

                    var allTertiaryNavs =
                        anchor.parentNode.parentNode.querySelectorAll(
                            menue.$options.thirdLevelNavSelector
                        );
                    for (var k = 0; k < allTertiaryNavs.length; k++) {
                        allTertiaryNavs[k].classList.remove(
                            menue.$options.openClass
                        );
                    }
                };

                if (
                    !this.classList.contains(menue.$options.openClass) &&
                    this.parentNode.classList.contains(
                        menue.$options.hasTertiaryClass
                    )
                ) {
                    event.preventDefault();
                    resetAll();

                    var tertiaryNav = this.parentNode.querySelector(
                        menue.$options.thirdLevelNavSelector
                    );
                    if (tertiaryNav) {
                        this.classList.add(menue.$options.openClass);
                        tertiaryNav.classList.add(menue.$options.openClass);
                    }
                } else {
                    resetAll();
                }
                menue.options.onMobileSecondaryAnchorClick(this, menue);
            });
        }
    }
}

export function removeMobileToggleListener(menue) {
    for (var i = 0; i < menue._mobileToggle.length; i++) {
        menue._mobileToggle[i].removeEventListener('click');
    }
}
