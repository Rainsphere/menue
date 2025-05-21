var Menue = (function () {
    'use strict';

    function setupStickyListener(menue) {
      window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || window.scrollY;
        var desktopStickyClass = menue.$options.desktopStickyClass;
        if (scrollTop >= menue.$options.desktopStickyOffset) {
          if (!menue._desktopMenu.classList.contains(desktopStickyClass)) {
            menue._desktopMenu.classList.add(desktopStickyClass);
            menue.$options.onDesktopStickyChange(menue);
          }
        } else {
          if (menue._desktopMenu.classList.contains(desktopStickyClass)) {
            menue._desktopMenu.classList.remove(desktopStickyClass);
            menue.$options.onDesktopStickyChange(menue);
          }
        }
      });
    }
    function removeStickyListener() {
      window.removeEventListener('scroll');
    }

    /**
     * Merges two objects, copying properties from options into target
     * @param {Object} target - Base object
     * @param {Object} options - Properties to merge
     * @returns {Object} Combined object
     */
    function extend(target, options) {
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
    var uniqueIdCounter = 0;
    /**
     * Generates a unique ID with a given prefix.
     * @param {string} prefix - The prefix for the ID.
     * @returns {string} A unique ID string.
     */
    function generateUniqueId() {
      var prefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'menue-id-';
      return "".concat(prefix).concat(uniqueIdCounter++);
    }

    /**
     * Handles keyboard activation for non-button elements acting as buttons.
     * Triggers a click handler if 'Enter' or 'Space' is pressed.
     * @param {KeyboardEvent} event - The keyboard event.
     * @param {Function} clickHandlerFunction - The function to call as if a click occurred.
     */
    function handleKeyboardActivation(event, clickHandlerFunction) {
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
    function toggleClass(element, className, force) {
      if (force === true) element.classList.add(className);else if (force === false) element.classList.remove(className);else element.classList.toggle(className);
    }

    /**
     * Handle toggle click events
     * @param {Event|Element} eventOrElement - Click event or DOM element
     * @param {Object} options - Options containing selectors and classes
     * @param {Function} callback - Callback function to execute after toggle
     */
    function handleToggleClick$1(eventOrElement, options, callback) {
      if (!eventOrElement || !options) return;
      var toggle = eventOrElement instanceof Event ? eventOrElement.currentTarget : eventOrElement;
      if (eventOrElement instanceof Event) {
        eventOrElement.preventDefault();
      }
      if (!toggle) return;
      var parentNode = toggle.parentNode;
      var secondaryNav = parentNode.querySelector(options.secondLevelNavSelector);
      if (!secondaryNav) return;
      var isOpen = toggle.classList.contains(options.openClass); // State *before* toggle
      var newStateOpen = !isOpen; // State *after* toggle

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

    /**
     * Common handler for toggle button clicks
     * @param {Element} button - Toggle button element
     * @param {Element} nav - Navigation element to toggle
     * @param {Object} options - Menu options
     * @param {Function} callback - Callback function
     */
    function handleToggleClick(button, nav, options, callback) {
      var isOpen = !button.classList.contains(options.openClass);
      if (nav) {
        toggleClass(button.parentNode, options.openClass, isOpen);
        toggleClass(button, options.openClass, isOpen);
        toggleClass(nav, options.openClass, isOpen);
      }
      callback(button);
    }
    function setupMobileToggleListener(menue) {
      var bodyEl = document.querySelector('body'); // More specific

      if (!menue._mobileMenu) return;

      // Ensure mobile menu has an ID for aria-controls
      if (!menue._mobileMenu.id) {
        menue._mobileMenu.id = generateUniqueId('menue-mobile-main-');
      }
      var _loop = function _loop() {
        var toggle = menue._mobileToggle[i];

        // Initial ARIA attributes for the main mobile toggle
        toggle.setAttribute('aria-controls', menue._mobileMenu.id);
        toggle.setAttribute('aria-expanded', 'false'); // Initial state
        toggle.setAttribute('aria-haspopup', 'true'); // Indicates it controls a menu

        if (toggle.tagName.toLowerCase() !== 'button') {
          toggle.setAttribute('role', 'button');
          toggle.setAttribute('tabindex', '0');
        }
        var performToggleAction = function performToggleAction(event) {
          var _this = this;
          // `this` will be the toggle element
          var isCurrentlyOpen = menue._mobileOpen; // State before action

          if (isCurrentlyOpen) {
            menue._mobileMenu.classList.add(menue.$options.mobileAnimatingClass);
            setTimeout(function () {
              _this.classList.remove(menue.$options.openClass);
              bodyEl.classList.remove(menue.$options.mobileOpenBodyClass);
              menue._mobileMenu.classList.remove(menue.$options.openClass);
              menue._mobileMenu.classList.remove(menue.$options.mobileAnimatingClass);
              menue._mobileOpen = false;
              _this.setAttribute('aria-expanded', 'false'); // Update ARIA
            }, menue.$options.mobileDisplayDelay);
          } else {
            menue._mobileMenu.classList.add(menue.$options.mobileAnimatingClass);
            bodyEl.classList.add(menue.$options.mobileOpenBodyClass);
            setTimeout(function () {
              _this.classList.add(menue.$options.openClass);
              menue._mobileMenu.classList.add(menue.$options.openClass);
              menue._mobileMenu.classList.remove(menue.$options.mobileAnimatingClass);
              menue._mobileOpen = true;
              _this.setAttribute('aria-expanded', 'true'); // Update ARIA
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
      };
      for (var i = 0; i < menue._mobileToggle.length; i++) {
        _loop();
      }
    }
    function setupMobileClasses(menue) {
      var primaryItems = menue._mobileMenu.querySelectorAll("".concat(menue.$options.firstLevelNavSelector, " > ul > li"));
      primaryItems.forEach(function (primaryItem, index) {
        var secondaryNav = primaryItem.querySelector(menue.$options.secondLevelNavSelector);
        var primaryToggle = primaryItem.querySelector('a'); // Default to anchor
        if (menue.$options.mobileHasSecondaryToggleButton) {
          primaryToggle = primaryItem.querySelector(menue.$options.itemToggleButtonClass) || primaryToggle;
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
          var secondaryItems = secondaryNav.querySelectorAll('ul > li');
          secondaryItems.forEach(function (secondaryItem, sIndex) {
            var tertiaryNav = secondaryItem.querySelector(menue.$options.thirdLevelNavSelector);
            var secondaryToggle = secondaryItem.querySelector('a'); // Default to anchor
            if (menue.$options.mobileHasTertiaryToggleButton) {
              secondaryToggle = secondaryItem.querySelector(menue.$options.itemToggleButtonClass) || secondaryToggle;
            }
            if (tertiaryNav && secondaryToggle) {
              secondaryItem.classList.add(menue.$options.hasTertiaryClass);

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
              secondaryToggle.setAttribute('aria-controls', tertiaryNav.id);
            }
          });
        }
      });
    }
    function setupMobileMenuItemListener(menue) {
      if (!menue._mobileMenu) return;

      // Helper function for click logic, now incorporating ARIA update
      var itemToggleClickHandler = function itemToggleClickHandler(eventOrElement) {
        var isAnchor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var toggleElement = eventOrElement.currentTarget || eventOrElement; // event.currentTarget for event, or element itself
        var parentLi = toggleElement.closest('li');
        if (!parentLi) return;
        var controlledNavSelector = parentLi.classList.contains(menue.$options.hasSecondaryClass) ? menue.$options.secondLevelNavSelector : menue.$options.thirdLevelNavSelector;
        var subNav = parentLi.querySelector(controlledNavSelector);
        if (isAnchor) {
          // Anchor-specific logic from original code
          if (!parentLi.classList.contains(menue.$options.hasSecondaryClass) && !parentLi.classList.contains(menue.$options.hasTertiaryClass)) {
            // Not a toggle anchor, let it navigate or do its thing
            // Call relevant callback if it exists
            if (parentLi.closest(menue.$options.firstLevelNavSelector)) {
              menue.$options.onMobilePrimaryAnchorClick(toggleElement, menue);
            } else if (parentLi.closest(menue.$options.secondLevelNavSelector)) {
              menue.$options.onMobileSecondaryAnchorClick(toggleElement, menue);
            }
            return;
          }

          // It's an anchor acting as a toggle
          if (eventOrElement.preventDefault && (parentLi.classList.contains(menue.$options.hasSecondaryClass) || parentLi.classList.contains(menue.$options.hasTertiaryClass))) {
            eventOrElement.preventDefault();
          }
          var currentlyOpen = toggleElement.classList.contains(menue.$options.openClass);
          var shouldOpen = !currentlyOpen && (parentLi.classList.contains(menue.$options.hasSecondaryClass) || parentLi.classList.contains(menue.$options.hasTertiaryClass));

          // Reset others (simplified, might need more specific scoping like original)
          var allAnchors = menue._mobileMenu.querySelectorAll('a');
          allAnchors.forEach(function (a) {
            if (a !== toggleElement) a.classList.remove(menue.$options.openClass);
            // also remove open from parent LIs and subnavs if needed for accordion style
          });
          var allSubNavs = menue._mobileMenu.querySelectorAll("".concat(menue.$options.secondLevelNavSelector, ", ").concat(menue.$options.thirdLevelNavSelector));
          allSubNavs.forEach(function (sn) {
            if (sn !== subNav) sn.classList.remove(menue.$options.openClass);
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
          } else if (parentLi.closest(menue.$options.secondLevelNavSelector)) {
            menue.$options.onMobileSecondaryAnchorClick(toggleElement, menue);
          }
        } else {
          // Button toggle logic (uses global handleToggleClick from utils)
          if (subNav) {
            // Pass event to handleToggleClick
            handleToggleClick(eventOrElement, menue.$options, function (toggle) {
              if (parentLi.classList.contains(menue.$options.hasSecondaryClass)) {
                menue.$options.onMobilePrimaryToggleClick(toggle, menue);
              } else if (parentLi.classList.contains(menue.$options.hasTertiaryClass)) {
                // Assuming this is for tertiary
                menue.$options.onMobileSecondaryToggleClick(toggle, menue);
              }
            });
          }
        }
      };

      // Primary Toggles / Anchors
      if (menue.$options.mobileHasSecondaryToggleButton) {
        var primaryToggleButtons = menue._mobileMenu.querySelectorAll("".concat(menue.$options.firstLevelNavSelector, " > ul > li > ").concat(menue.$options.itemToggleButtonClass));
        primaryToggleButtons.forEach(function (button) {
          button.addEventListener('click', itemToggleClickHandler);
          if (button.tagName.toLowerCase() !== 'button') {
            // Should have role="button" from setupMobileClasses
            button.addEventListener('keydown', function (event) {
              handleKeyboardActivation(event, itemToggleClickHandler);
            });
          }
        });
      } else {
        var primaryAnchors = menue._mobileMenu.querySelectorAll("".concat(menue.$options.firstLevelNavSelector, " > ul > li > a"));
        primaryAnchors.forEach(function (anchor) {
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
        var secondaryToggleButtons = menue._mobileMenu.querySelectorAll("".concat(menue.$options.secondLevelNavSelector, " > ul > li > ").concat(menue.$options.itemToggleButtonClass));
        secondaryToggleButtons.forEach(function (button) {
          button.addEventListener('click', itemToggleClickHandler);
          if (button.tagName.toLowerCase() !== 'button') {
            // Should have role="button"
            button.addEventListener('keydown', function (event) {
              handleKeyboardActivation(event, itemToggleClickHandler);
            });
          }
        });
      } else {
        var secondaryAnchors = menue._mobileMenu.querySelectorAll("".concat(menue.$options.secondLevelNavSelector, " > ul > li > a"));
        secondaryAnchors.forEach(function (anchor) {
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
    function removeMobileToggleListener(menue) {
      for (var i = 0; i < menue._mobileToggle.length; i++) {
        menue._mobileToggle[i].removeEventListener('click');
      }
    }

    function destroyMixin(Menue) {
      Menue.prototype.destroy = function () {
        removeStickyListener();
        removeMobileToggleListener(this);
      };
    }

    var defaults = {
      //General Options
      firstLevelNavSelector: '.primary-nav',
      secondLevelNavSelector: '.secondary-nav',
      thirdLevelNavSelector: '.tertiary-nav',
      itemToggleButtonClass: '.item-toggle-button',
      hasSecondaryClass: 'has-secondary',
      hasTertiaryClass: 'has-tertiary',
      openClass: 'is-open',
      //Desktop Options
      desktopMenuSelector: '.desktop-menu',
      desktopStickyOffset: 50,
      desktopStickyClass: 'is-sticky',
      desktopHasSecondaryToggleButton: false,
      desktopHasTertiaryToggleButton: false,
      //Mobile Options
      mobileMenuSelector: '.mobile-menu',
      mobileToggleSelector: '.mobile-toggle',
      mobileAnimatingClass: 'is-animating',
      mobileDisplayDelay: 200,
      mobileOpenBodyClass: 'mobile-menu-open',
      mobileHasSecondaryToggleButton: false,
      mobileHasTertiaryToggleButton: false,
      //Callbacks
      // onDesktopStickyChange: function (instance) {}
      onDesktopStickyChange: function onDesktopStickyChange() {},
      // onMobileToggleClick: function (toggle, instance) {}
      onMobileToggleClick: function onMobileToggleClick() {},
      // onDesktopPrimaryToggleClick: function (toggle, instance) {}
      onDesktopPrimaryToggleClick: function onDesktopPrimaryToggleClick() {},
      // onDesktopSecondaryToggleClick: function (toggle, instance) {}
      onDesktopSecondaryToggleClick: function onDesktopSecondaryToggleClick() {},
      // onMobilePrimaryToggleClick: function (toggle, instance) {}
      onMobilePrimaryToggleClick: function onMobilePrimaryToggleClick() {},
      // onMobileSecondaryToggleClick: function (toggle, instance) {}
      onMobileSecondaryToggleClick: function onMobileSecondaryToggleClick() {},
      // onMobileTertiaryToggleClick: function (anchor, instance) {}
      onMobilePrimaryAnchorClick: function onMobilePrimaryAnchorClick() {},
      // onMobileSecondaryAnchorClick: function (anchor, instance) {}
      onMobileSecondaryAnchorClick: function onMobileSecondaryAnchorClick() {}
    };

    function setupDesktopMenuItemListener(menue) {
      var _menue$$options = menue.$options,
        itemToggleButtonClass = _menue$$options.itemToggleButtonClass,
        firstLevelNavSelector = _menue$$options.firstLevelNavSelector,
        secondLevelNavSelector = _menue$$options.secondLevelNavSelector,
        thirdLevelNavSelector = _menue$$options.thirdLevelNavSelector,
        desktopHasSecondaryToggleButton = _menue$$options.desktopHasSecondaryToggleButton,
        desktopHasTertiaryToggleButton = _menue$$options.desktopHasTertiaryToggleButton,
        openClass = _menue$$options.openClass;
      if (!menue._desktopMenu) return;

      // Initial ARIA setup
      var primaryItems = menue._desktopMenu.querySelectorAll("".concat(firstLevelNavSelector, " > ul > li"));
      primaryItems.forEach(function (primaryItem) {
        var secondaryNav = primaryItem.querySelector(secondLevelNavSelector);
        var primaryToggle = null;
        if (desktopHasSecondaryToggleButton) {
          primaryToggle = primaryItem.querySelector(":scope > ".concat(itemToggleButtonClass));
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
          var secondaryItems = secondaryNav.querySelectorAll(':scope > ul > li');
          secondaryItems.forEach(function (secondaryItem) {
            var tertiaryNav = secondaryItem.querySelector(thirdLevelNavSelector);
            var secondaryToggle = null;
            if (desktopHasTertiaryToggleButton) {
              secondaryToggle = secondaryItem.querySelector(":scope > ".concat(itemToggleButtonClass));
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
                tertiaryNav.id = generateUniqueId('menue-desktop-tertiary-');
              }
              secondaryToggle.setAttribute('aria-controls', tertiaryNav.id);
            }
          });
        }
      });

      // Event Listeners
      if (desktopHasSecondaryToggleButton) {
        var primaryToggleButtons = menue._desktopMenu.querySelectorAll("".concat(firstLevelNavSelector, " > ul > li > ").concat(itemToggleButtonClass));
        primaryToggleButtons.forEach(function (button) {
          // Click listener is already using handleToggleClick from utils,
          // which will be updated for aria-expanded.
          // Click listener is already using handleToggleClick from utils,
          // which will be updated for aria-expanded.
          var primaryToggleClickHandler = function primaryToggleClickHandler(event) {
            handleToggleClick$1(event, menue.$options, function (toggle) {
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
        var secondaryToggleButtons = menue._desktopMenu.querySelectorAll("".concat(secondLevelNavSelector, " > ul > li > ").concat(itemToggleButtonClass));
        secondaryToggleButtons.forEach(function (secToggleButton) {
          var tertiaryToggleClickHandler = function tertiaryToggleClickHandler() {
            // `this` will be secToggleButton
            var parentLi = this.closest('li');
            var tertiaryNav = parentLi ? parentLi.querySelector(thirdLevelNavSelector) : null;
            if (tertiaryNav) {
              var isOpen = this.classList.contains(openClass);
              var newState = !isOpen;

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
          secToggleButton.addEventListener('click', tertiaryToggleClickHandler);
          if (secToggleButton.getAttribute('role') === 'button') {
            secToggleButton.addEventListener('keydown', function (event) {
              handleKeyboardActivation(event, tertiaryToggleClickHandler);
            });
          }
        });
      }
    }

    function initMixin(Menue) {
      Menue.prototype.init = function (options) {
        var menue = this;
        menue.$options = extend(defaults, options);
        menue._desktopMenu = document.querySelectorAll(menue.$options.desktopMenuSelector)[0];
        menue._mobileMenu = document.querySelectorAll(menue.$options.mobileMenuSelector)[0];
        menue._mobileToggle = document.querySelectorAll(menue.$options.mobileToggleSelector);
        menue._mobileOpen = false;
        setupStickyListener(menue);
        setupMobileClasses(menue);
        setupMobileToggleListener(menue);
        setupMobileMenuItemListener(menue);
        setupDesktopMenuItemListener(menue);
      };
    }

    function Menue(options) {
      this.init(options);
    }
    initMixin(Menue);
    destroyMixin(Menue);

    return Menue;

})();
