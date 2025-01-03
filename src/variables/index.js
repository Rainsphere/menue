export const defaults = {
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
    onDesktopStickyChange: () => {}, 
    // onMobileToggleClick: function (toggle, instance) {}
    onMobileToggleClick: () => {},
    // onDesktopPrimaryToggleClick: function (toggle, instance) {}
    onDesktopPrimaryToggleClick: () => {},
    // onDesktopSecondaryToggleClick: function (toggle, instance) {}
    onDesktopSecondaryToggleClick: () => {},
    // onMobilePrimaryToggleClick: function (toggle, instance) {}
    onMobilePrimaryToggleClick: () => {},
    // onMobileSecondaryToggleClick: function (toggle, instance) {}
    onMobileSecondaryToggleClick: () => {},
    // onMobileTertiaryToggleClick: function (anchor, instance) {}
    onMobilePrimaryAnchorClick: () => {},
    // onMobileSecondaryAnchorClick: function (anchor, instance) {}
    onMobileSecondaryAnchorClick: () => {},
};
