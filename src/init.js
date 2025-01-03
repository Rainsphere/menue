import { extend } from './utils/index.js';
import { defaults } from './variables/index.js';
import { setupStickyListener } from './sticky.js';
import {
    setupMobileClasses,
    setupMobileToggleListener,
    setupMobileMenuItemListener,
} from './mobile.js';
import { setupDesktopMenuItemListener } from './desktop.js';
export function initMixin(Menue) {
    Menue.prototype.init = function (options) {
        const menue = this;
        menue.$options = extend(defaults, options);
        menue._desktopMenu = document.querySelectorAll(
            menue.$options.desktopMenuSelector
        )[0];
        menue._mobileMenu = document.querySelectorAll(
            menue.$options.mobileMenuSelector
        )[0];
        menue._mobileToggle = document.querySelectorAll(
            menue.$options.mobileToggleSelector
        );
        menue._mobileOpen = false;

        setupStickyListener(menue);
        setupMobileClasses(menue);
        setupMobileToggleListener(menue);
        setupMobileMenuItemListener(menue);
        setupDesktopMenuItemListener(menue);
    };
}
