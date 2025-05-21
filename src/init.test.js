import { initMixin } from './init';
import { defaults } from './variables';

// Mock dependent modules/functions
jest.mock('./utils/index.js', () => ({
    extend: jest.fn((target, opts) => ({ ...target, ...opts })),
}));

jest.mock('./sticky.js', () => ({
    setupStickyListener: jest.fn(),
}));

jest.mock('./mobile.js', () => ({
    setupMobileClasses: jest.fn(),
    setupMobileToggleListener: jest.fn(),
    setupMobileMenuItemListener: jest.fn(),
}));

jest.mock('./desktop.js', () => ({
    setupDesktopMenuItemListener: jest.fn(),
}));

// Import mocks to allow spying on them or checking calls
import { extend } from './utils/index.js';
import { setupStickyListener } from './sticky.js';
import {
    setupMobileClasses,
    setupMobileToggleListener,
    setupMobileMenuItemListener,
} from './mobile.js';
import { setupDesktopMenuItemListener } from './desktop.js';

describe('Init Mixin - initMixin(Menue)', () => {
    let MockMenue;
    let instance;
    let userOptions;

    const DESKTOP_MENU_SELECTOR = '.desktop-menu-selector';
    const MOBILE_MENU_SELECTOR = '.mobile-menu-selector';
    const MOBILE_TOGGLE_SELECTOR = '.mobile-toggle-selector';

    beforeEach(() => {
        // Setup mock DOM
        document.body.innerHTML = `
      <div class="${DESKTOP_MENU_SELECTOR.substring(1)}"></div>
      <div class="${MOBILE_MENU_SELECTOR.substring(1)}"></div>
      <button class="${MOBILE_TOGGLE_SELECTOR.substring(1)}"></button>
      <div id="other-element"></div>
    `;

        MockMenue = function () {};
        initMixin(MockMenue);
        instance = new MockMenue();

        extend.mockClear();
        setupStickyListener.mockClear();
        setupMobileClasses.mockClear();
        setupMobileToggleListener.mockClear();
        setupMobileMenuItemListener.mockClear();
        setupDesktopMenuItemListener.mockClear();

        userOptions = {
            desktopMenuSelector: DESKTOP_MENU_SELECTOR,
            mobileMenuSelector: MOBILE_MENU_SELECTOR,
            mobileToggleSelector: MOBILE_TOGGLE_SELECTOR,
        };
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('should set up Menue.prototype.init function', () => {
        expect(typeof MockMenue.prototype.init).toBe('function');
    });

    describe('instance.init(options)', () => {
        it('should call extend with defaults and user-provided options', () => {
            instance.init(userOptions);
            expect(extend).toHaveBeenCalledTimes(1);
            // The actual defaults from variables.js is the first arg to extend in init.js
            expect(extend).toHaveBeenCalledWith(defaults, userOptions);
        });

        it('should set instance.$options with the result of extend', () => {
            const expectedOptions = { ...defaults, ...userOptions };
            extend.mockReturnValueOnce(expectedOptions); // Control return value for this test
            instance.init(userOptions);
            expect(instance.$options).toEqual(expectedOptions);
        });

        it('should select DOM elements based on $options selectors', () => {
            instance.init(userOptions);
            expect(instance._desktopMenu).toBe(
                document.querySelector(DESKTOP_MENU_SELECTOR)
            );
            expect(instance._mobileMenu).toBe(
                document.querySelector(MOBILE_MENU_SELECTOR)
            );
            // _mobileToggle is a NodeList
            expect(instance._mobileToggle).toEqual(
                document.querySelectorAll(MOBILE_TOGGLE_SELECTOR)
            );
        });

        it('should handle missing optional DOM elements by setting them to undefined or empty NodeList', () => {
            document.body.innerHTML = ''; // Clear DOM
            const optionsForMissing = {
                ...userOptions,
                desktopMenuSelector: '.non-existent-desktop',
                mobileMenuSelector: '.non-existent-mobile',
                mobileToggleSelector: '.non-existent-toggle',
            };
            instance.init(optionsForMissing);

            expect(instance._desktopMenu).toBeUndefined();
            expect(instance._mobileMenu).toBeUndefined();
            expect(instance._mobileToggle).toEqual(
                document.querySelectorAll('.non-existent-toggle')
            ); // empty NodeList
            expect(instance._mobileToggle.length).toBe(0);
        });

        it('should initialize instance._mobileOpen to false', () => {
            instance.init(userOptions);
            expect(instance._mobileOpen).toBe(false);
        });

        it('should always call setupStickyListener', () => {
            instance.init(userOptions);
            expect(setupStickyListener).toHaveBeenCalledWith(instance);
        });

        it('should always call setupMobileClasses', () => {
            instance.init(userOptions);
            expect(setupMobileClasses).toHaveBeenCalledWith(instance);
        });

        it('should always call setupMobileToggleListener', () => {
            instance.init(userOptions);
            expect(setupMobileToggleListener).toHaveBeenCalledWith(instance);
        });

        it('should always call setupMobileMenuItemListener', () => {
            instance.init(userOptions);
            expect(setupMobileMenuItemListener).toHaveBeenCalledWith(instance);
        });

        it('should always call setupDesktopMenuItemListener', () => {
            instance.init(userOptions); // isDropdown defaults to false in variables/defaults
            expect(setupDesktopMenuItemListener).toHaveBeenCalledWith(instance);
        });

        // Test that the setup functions are called even if elements are missing,
        // as init.js calls them unconditionally.
        // The setup functions themselves should handle missing elements.
        it('should call setup functions even with missing _desktopMenu', () => {
            const optionsNoDesktop = {
                ...userOptions,
                desktopMenuSelector: '.no-desktop',
            };
            instance.init(optionsNoDesktop);
            expect(instance._desktopMenu).toBeUndefined();
            expect(setupDesktopMenuItemListener).toHaveBeenCalledWith(instance);
            // Other functions also called
            expect(setupMobileClasses).toHaveBeenCalledWith(instance);
            expect(setupMobileToggleListener).toHaveBeenCalledWith(instance);
        });

        it('should call setup functions even with missing _mobileMenu', () => {
            const optionsNoMobile = {
                ...userOptions,
                mobileMenuSelector: '.no-mobile',
            };
            instance.init(optionsNoMobile);
            expect(instance._mobileMenu).toBeUndefined();
            expect(setupMobileClasses).toHaveBeenCalledWith(instance);
            expect(setupMobileMenuItemListener).toHaveBeenCalledWith(instance);
            // Other functions also called
            expect(setupMobileToggleListener).toHaveBeenCalledWith(instance);
        });

        it('should call setup functions even with missing _mobileToggle', () => {
            const optionsNoToggle = {
                ...userOptions,
                mobileToggleSelector: '.no-toggle',
            };
            instance.init(optionsNoToggle);
            expect(instance._mobileToggle).toEqual(
                document.querySelectorAll('.no-toggle')
            );
            expect(instance._mobileToggle.length).toBe(0);
            expect(setupMobileToggleListener).toHaveBeenCalledWith(instance);
            // Other functions also called
            expect(setupMobileClasses).toHaveBeenCalledWith(instance);
            expect(setupMobileMenuItemListener).toHaveBeenCalledWith(instance);
        });
    });
});
