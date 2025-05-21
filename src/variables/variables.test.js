import { defaults } from './index';

describe('Variables - defaults', () => {
    it('should be an object', () => {
        expect(typeof defaults).toBe('object');
        expect(defaults).not.toBeNull();
    });

    it('should contain all expected top-level keys', () => {
        const actualKeys = Object.keys(defaults);
        // Based on the output from read_files(["src/variables/index.js"])
        const expectedKeys = [
            'firstLevelNavSelector',
            'secondLevelNavSelector',
            'thirdLevelNavSelector',
            'itemToggleButtonClass',
            'hasSecondaryClass',
            'hasTertiaryClass',
            'openClass',
            'desktopMenuSelector',
            'desktopStickyOffset',
            'desktopStickyClass',
            'desktopHasSecondaryToggleButton',
            'desktopHasTertiaryToggleButton',
            'mobileMenuSelector',
            'mobileToggleSelector',
            'mobileAnimatingClass',
            'mobileDisplayDelay',
            'mobileOpenBodyClass',
            'mobileHasSecondaryToggleButton',
            'mobileHasTertiaryToggleButton',
            'onDesktopStickyChange',
            'onMobileToggleClick',
            'onDesktopPrimaryToggleClick',
            'onDesktopSecondaryToggleClick',
            'onMobilePrimaryToggleClick',
            'onMobileSecondaryToggleClick',
            'onMobilePrimaryAnchorClick',
            'onMobileSecondaryAnchorClick',
        ];

        // Check that all expected keys are present
        expectedKeys.forEach(key => {
            expect(defaults).toHaveProperty(key);
        });
        // Optionally, check that no unexpected keys are present
        expect(actualKeys.length).toBe(expectedKeys.length);
    });

    it('should have correct default values for some key options', () => {
        expect(defaults.desktopMenuSelector).toBe('.desktop-menu');
        expect(defaults.mobileMenuSelector).toBe('.mobile-menu');
        expect(defaults.mobileToggleSelector).toBe('.mobile-toggle');
        expect(defaults.openClass).toBe('is-open');
        expect(defaults.desktopStickyOffset).toBe(50);
        // Check a callback to ensure it's a function
        expect(typeof defaults.onMobileToggleClick).toBe('function');
    });
});
