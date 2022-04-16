(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Menue = factory());
})(this, (function () { 'use strict';

    function setupStickyListener(menue) {
      window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || window.scrollY;
        const desktopStickyClass = menue.$options.desktopStickyClass;

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

    function setupMobileToggleListener(menue) {
      var bodyEl = document.querySelectorAll("body")[0];

      for (var i = 0; i < menue._mobileToggle.length; i++) {
        var toggle = menue._mobileToggle[i];
        toggle.addEventListener("click", function () {
          var thisToggle = this;

          if (menue._mobileOpen) {
            menue._mobileMenu.classList.add(menue.$options.mobileAnimatingClass);

            setTimeout(function () {
              thisToggle.classList.remove(menue.$options.openClass);
              bodyEl.classList.remove(menue.$options.mobileOpenBodyClass);

              menue._mobileMenu.classList.remove(menue.$options.openClass);

              menue._mobileMenu.classList.remove(menue.$options.mobileAnimatingClass);

              menue._mobileOpen = false;
            }, menue.$options.mobileDisplayDelay);
          } else {
            menue._mobileMenu.classList.add(menue.$options.mobileAnimatingClass);

            bodyEl.classList.add(menue.$options.mobileOpenBodyClass);
            setTimeout(function () {
              thisToggle.classList.add(menue.$options.openClass);

              menue._mobileMenu.classList.add(menue.$options.openClass);

              menue._mobileMenu.classList.remove(menue.$options.mobileAnimatingClass);

              menue._mobileOpen = true;
            }, menue.$options.mobileDisplayDelay);
          }

          menue.$options.onMobileToggleClick(this, menue);
        });
      }
    }
    function setupMobileClasses(menue) {
      var primaryItems = menue._mobileMenu.querySelectorAll(menue.$options.firstLevelNavSelector + " > ul > li"); //check for secondary nav


      for (var i = 0; i < primaryItems.length; i++) {
        var secondaryItem = primaryItems[i].querySelector(menue.$options.secondLevelNavSelector);

        if (secondaryItem) {
          //we have secondary nav
          primaryItems[i].classList.add(menue.$options.hasSecondaryClass); //check for tertiary nav

          var secondaryItems = secondaryItem.querySelectorAll("ul > li");

          for (var j = 0; j < secondaryItems.length; j++) {
            var tertiaryItem = secondaryItems[j].querySelector(menue.$options.thirdLevelNavSelector);

            if (tertiaryItem) {
              secondaryItems[j].classList.add(menue.$options.hasTertiaryClass);
            }
          }
        }
      }
    }
    function setupMobileMenuItemListener(menue) {
      if (menue.$options.mobileHasSecondaryToggleButton) {
        //Listen for close button clicks to open/close the secondary-nav
        var primaryToggleButtons = menue._mobileMenu.querySelectorAll(menue.$options.firstLevelNavSelector + " > ul > li > " + menue.$options.itemToggleButtonClass);

        for (var i = 0; i < primaryToggleButtons.length; i++) {
          var primToggleButton = primaryToggleButtons[i];
          primToggleButton.addEventListener("click", function () {
            var secondaryNav = this.parentNode.querySelector(menue.$options.secondLevelNavSelector);

            if (!this.classList.contains(menue.$options.openClass)) {
              if (secondaryNav) {
                this.parentNode.classList.add(menue.$options.openClass);
                this.classList.add(menue.$options.openClass);
                secondaryNav.classList.add(menue.$options.openClass);
              }
            } else {
              if (secondaryNav) {
                this.parentNode.classList.remove(menue.$options.openClass);
                this.classList.remove(menue.$options.openClass);
                secondaryNav.classList.remove(menue.$options.openClass);
              }
            }

            menue.$options.onMobilePrimaryToggleClick(this, menue);
          });
        }
      } else {
        //Listen for anchor clicks to open/close the secondary-nav
        var primaryAnchors = menue._mobileMenu.querySelectorAll(menue.$options.firstLevelNavSelector + " > ul > li > a");

        for (var a = 0; i < primaryAnchors.length; a++) {
          var anchor = primaryAnchors[a];
          anchor.addEventListener("click", function (event) {
            var resetAll = function () {
              for (var j = 0; j < primaryAnchors.length; j++) {
                primaryAnchors[j].classList.remove(menue.$options.openClass);
              }

              var allSecondaryNavs = menue._mobileMenu.querySelectorAll(menue.$options.secondLevelNavSelector);

              for (var k = 0; k < allSecondaryNavs.length; k++) {
                allSecondaryNavs[k].classList.remove(menue.$options.openClass);
              }
            };

            if (!this.classList.contains(menue.$options.openClass) && this.parentNode.classList.contains(menue.$options.hasSecondaryClass)) {
              event.preventDefault();
              resetAll();
              var secondaryNav = this.parentNode.querySelector(menue.$options.secondLevelNavSelector);

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
        var secondaryToggleButtons = menue._mobileMenu.querySelectorAll(menue.$options.secondLevelNavSelector + " > ul > li > " + menue.$options.itemToggleButtonClass);

        for (var l = 0; l < secondaryToggleButtons.length; l++) {
          var secTogButton = secondaryToggleButtons[l];
          secTogButton.addEventListener("click", function () {
            var tertiaryNav = this.parentNode.querySelector(menue.$options.thirdLevelNavSelector);

            if (!this.classList.contains(menue.$options.openClass)) {
              if (tertiaryNav) {
                this.parentNode.classList.add(menue.$options.openClass);
                this.classList.add(menue.$options.openClass);
                tertiaryNav.classList.add(menue.$options.openClass);
              }
            } else {
              if (tertiaryNav) {
                this.parentNode.classList.remove(menue.$options.openClass);
                this.classList.remove(menue.$options.openClass);
                tertiaryNav.classList.remove(menue.$options.openClass);
              }
            }

            menue.$options.onMobileSecondaryToggleClick(this, menue);
          });
        }
      } else {
        //Listen for anchor clicks to open/close the tertiary-nav
        var secondaryAnchors = menue._mobileMenu.querySelectorAll(menue.$options.secondLevelNavSelector + " > ul > li > a");

        for (var m = 0; m < secondaryAnchors.length; m++) {
          var secAnchor = secondaryAnchors[m];
          secAnchor.addEventListener("click", function (event) {
            var resetAll = function () {
              for (var j = 0; j < secondaryAnchors.length; j++) {
                secondaryAnchors[j].classList.remove(menue.$options.openClass);
              }

              var allTertiaryNavs = anchor.parentNode.parentNode.querySelectorAll(menue.$options.thirdLevelNavSelector);

              for (var k = 0; k < allTertiaryNavs.length; k++) {
                allTertiaryNavs[k].classList.remove(menue.$options.openClass);
              }
            };

            if (!this.classList.contains(menue.$options.openClass) && this.parentNode.classList.contains(menue.$options.hasTertiaryClass)) {
              event.preventDefault();
              resetAll();
              var tertiaryNav = this.parentNode.querySelector(menue.$options.thirdLevelNavSelector);

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
    function removeMobileToggleListener(menue) {
      for (var i = 0; i < menue._mobileToggle.length; i++) {
        menue._mobileToggle[i].removeEventListener("click");
      }
    }

    function destroyMixin(Menue) {
      Menue.prototype.destroy = function () {
        removeStickyListener();
        removeMobileToggleListener(this);
      };
    }

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

    const defaults = {
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
      onDesktopStickyChange: function (instance) {},
      onMobileToggleClick: function (toggle, instance) {},
      onDesktopPrimaryToggleClick: function (toggle, instance) {},
      onDesktopSecondaryToggleClick: function (toggle, instance) {},
      onMobilePrimaryToggleClick: function (toggle, instance) {},
      onMobileSecondaryToggleClick: function (toggle, instance) {},
      onMobilePrimaryAnchorClick: function (anchor, instance) {},
      onMobileSecondaryAnchorClick: function (anchor, instance) {}
    };

    function setupDesktopMenuItemListener(menue) {
      const itemToggleButtonClass = menue.$options.itemToggleButtonClass;

      if (menue.$options.desktopHasSecondaryToggleButton) {
        //Listen for toggle button clicks to open/close the secondary-nav
        const primaryToggleButtons = menue._desktopMenu.querySelectorAll(menue.$options.firstLevelNavSelector + " > ul > li > " + itemToggleButtonClass);

        for (let i = 0; i < primaryToggleButtons.length; i++) {
          const primToggleButton = primaryToggleButtons[i];
          primToggleButton.addEventListener("click", function () {
            var secondaryNav = this.parentNode.querySelector(menue.$options.secondLevelNavSelector);

            if (!this.classList.contains(menue.$options.openClass)) {
              if (secondaryNav) {
                this.parentNode.classList.add(menue.$options.openClass);
                this.classList.add(menue.$options.openClass);
                secondaryNav.classList.add(menue.$options.openClass);
              }
            } else {
              if (secondaryNav) {
                this.parentNode.classList.remove(menue.$options.openClass);
                this.classList.remove(menue.$options.openClass);
                secondaryNav.classList.remove(menue.$options.openClass);
              }
            }

            menue.$options.onDesktopPrimaryToggleClick(this, menue);
          });
        }
      }

      if (menue.$options.desktopHasTertiaryToggleButton) {
        //Listen for close button clicks to open/close the tertiary-nav
        const secondaryToggleButtons = menue._desktopMenu.querySelectorAll(menue.$options.secondLevelNavSelector + " > ul > li > " + itemToggleButtonClass);

        for (let s = 0; s < secondaryToggleButtons.length; s++) {
          const secToggleButton = secondaryToggleButtons[s];
          secToggleButton.addEventListener("click", function () {
            const tertiaryNav = this.parentNode.querySelector(menue.$options.thirdLevelNavSelector);

            if (!this.classList.contains(menue.$options.openClass)) {
              if (tertiaryNav) {
                this.parentNode.classList.add(menue.$options.openClass);
                this.classList.add(menue.$options.openClass);
                tertiaryNav.classList.add(menue.$options.openClass);
              }
            } else {
              if (tertiaryNav) {
                this.parentNode.classList.remove(menue.$options.openClass);
                this.classList.remove(menue.$options.openClass);
                tertiaryNav.classList.remove(menue.$options.openClass);
              }
            }

            menue.$options.onDesktopSecondaryToggleClick(this, menue);
          });
        }
      }
    }

    function initMixin(Menue) {
      Menue.prototype.init = function (options) {
        const menue = this;
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

}));
