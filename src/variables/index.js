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
    onDesktopStickyChange: function(instance){},
    onMobileToggleClick: function(toggle, instance){},
    onDesktopPrimaryToggleClick: function(toggle, instance){},
    onDesktopSecondaryToggleClick: function(toggle, instance){},
    onMobilePrimaryToggleClick: function(toggle, instance){},
    onMobileSecondaryToggleClick: function(toggle, instance){},
    onMobilePrimaryAnchorClick: function(anchor, instance){},
    onMobileSecondaryAnchorClick: function(anchor, instance){}
};