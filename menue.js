/**
 * Copyright (c) David Spencer. All rights reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
 * documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
 * the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions 
 * of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
 * TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
 * DEALINGS IN THE SOFTWARE.
 *
 * @summary short description for the file
 * @author David Spencer
 *
 * Created at     : 2019-12-23 09:43:09 
 * Last modified  : 2019-12-23 09:49:26
 */

( function( root, factory ) {

    var pluginName = 'Menue';

    if ( typeof define === 'function' && define.amd ) {
        define( [], factory( pluginName ) );
    } else if ( typeof exports === 'object' ) {
        module.exports = factory( pluginName );
    } else {
        root[ pluginName ] = factory( pluginName );
    }
}( this, function( pluginName ) {

    'use strict';

    var defaults = {
        //General Options
        firstLevelNavSelector: '.primary-nav',
        secondLevelNavSelector: '.secondary-nav',
        thirdLevelNavSelector: '.tertiary-nav',
        closeButtonClass: '.menu-close-button',
        hasSecondaryClass: 'has-secondary',
        hasTertiaryClass: 'has-tertiary',
        //Desktop Options
        desktopMenuSelector: '.desktop-menu',
        desktopStickyOffset: 50,
        desktopStickyClass: 'is-sticky',
        desktopHasSecondaryCloseButton: false,
        desktopHasTertiaryCloseButton: false,
        //Mobile Options
        mobileMenuSelector: '.mobile-menu',
        mobileToggleSelector: '.mobile-toggle',
        mobileOpenClass: 'is-open',
        mobileAnimatingClass: 'is-animating',
        mobileDisplayDelay: 200,
        mobileOpenBodyClass: 'mobile-menu-open',
        mobileHasSecondaryCloseButton: false,
        mobileHasTertiaryCloseButton: false,
        //Callbacks
        onDesktopStickyChange: function(instance){}
    };
    /** 
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function( target, options ) {
        var prop, extended = {};
        for ( prop in defaults ) {
            if ( Object.prototype.hasOwnProperty.call( defaults, prop ) ) {
                extended[ prop ] = defaults[ prop ];
            }
        }
        for ( prop in options ) {
            if ( Object.prototype.hasOwnProperty.call( options, prop ) ) {
                extended[ prop ] = options[ prop ];
            }
        }
        return extended;
    };

    /**
     * Helper Functions
     @private
     */

    var setupStickyListener = function(instance){
      
        window.addEventListener('scroll', function(){
            var scrollTop = window.scrollY;
         
            if(scrollTop >= instance.options.desktopStickyOffset)
            {
                instance.desktopMenu.classList.add(instance.options.desktopStickyClass);
                instance.options.onDesktopStickyChange(instance);
            }
            else
            {
                instance.desktopMenu.classList.remove(instance.options.desktopStickyClass);
                instance.options.onDesktopStickyChange(instance);
            }
        });
    };

    var setupMobileToggleListener = function(instance){
        var bodyEl = document.querySelectorAll( 'body' )[0];
        instance.mobileToggle.forEach(function(toggle){
            toggle.addEventListener('click', function(){
                if(instance.mobileOpen)
                {
                        instance.mobileMenu.classList.add(instance.options.mobileAnimatingClass);
                        setTimeout(function(){
                            bodyEl.classList.remove(instance.options.mobileOpenBodyClass);
                            instance.mobileMenu.classList.remove(instance.options.mobileOpenClass);
                            instance.mobileMenu.classList.remove(instance.options.mobileAnimatingClass);
                            instance.mobileOpen = false;
                        }, instance.options.mobileDisplayDelay);
                }
                else{
                   
                        instance.mobileMenu.classList.add(instance.options.mobileAnimatingClass);
                        bodyEl.classList.add(instance.options.mobileOpenBodyClass);
                        setTimeout(function(){
                            instance.mobileMenu.classList.add(instance.options.mobileOpenClass);
                            instance.mobileMenu.classList.remove(instance.options.mobileAnimatingClass);
                            instance.mobileOpen = true;
                        }, instance.options.mobileDisplayDelay);
                   
                    
                }
            });
        });
    }

    var setupMobileClasses = function(instance){
        var primaryItems = instance.mobileMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li');

        //check for secondary nav
        primaryItems.forEach(function(primItem){
            var secondaryItem = primItem.querySelector(instance.options.secondLevelNavSelector);
            if(secondaryItem)
            {
                //we have secondary nav
                primItem.classList.add(instance.options.hasSecondaryClass);
                //check for tertiary nav
                var secondaryItems = secondaryItem.querySelectorAll('ul > li');
                secondaryItems.forEach(function(secItem){
                    var tertiaryItem = secItem.querySelector(instance.options.thirdLevelNavSelector);
                    if(tertiaryItem)
                    {   
                        secItem.classList.add(instance.options.hasTertiaryClass);
                    }
                });
            }
        });
    }

    var setupMobileMenuItemListener = function(instance){
        if(instance.options.mobileHasSecondaryCloseButton){
            //Listen for close button clicks to open/close the secondary-nav
        }else{
            //Listen for anchor clicks to open/close the secondary-nav
            var primaryAnchors = instance.mobileMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li > a');
            primaryAnchors.forEach(function(anchor){
                anchor.addEventListener('click', function(event){

                    var resetAll = function(){
                        primaryAnchors.forEach(function(primAnchor){
                            primAnchor.classList.remove(instance.options.mobileOpenClass);
                        });
                        var allSecondaryNavs= instance.mobileMenu.querySelectorAll(instance.options.secondLevelNavSelector);
                        allSecondaryNavs.forEach(function(nav){
                            nav.classList.remove(instance.options.mobileOpenClass);
                        });
                    }

                    if(!anchor.classList.contains(instance.options.mobileOpenClass) && anchor.parentNode.classList.contains(instance.options.hasSecondaryClass))
                    {
                        event.preventDefault();
                        resetAll();
                        
                        var secondaryNav = anchor.parentNode.querySelector(instance.options.secondLevelNavSelector);
                        if(secondaryNav) {
                            anchor.classList.add(instance.options.mobileOpenClass);
                            secondaryNav.classList.add(instance.options.mobileOpenClass);
                        }
                    }
                    else{
                        resetAll();
                    }
                    
                });
            });
        }
        if(instance.options.mobileHasTertiaryCloseButton){}else{}
    }

    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    function Plugin( options ) {
        this.options = extend( defaults, options );
        this.init(); // Initialization Code Here
    }

    /**
     * Plugin prototype
     * @public
     * @constructor
     */
    Plugin.prototype = {
        init: function() {
            // find all matching DOM elements.
            // makes selector objects available to instance.
            this.desktopMenu = document.querySelectorAll( this.options.desktopMenuSelector )[0];
            this.mobileMenu = document.querySelectorAll( this.options.mobileMenuSelector )[0];
            this.mobileToggle = document.querySelectorAll( this.options.mobileToggleSelector );
            this.mobileOpen = false;
            setupStickyListener(this);
            setupMobileClasses(this);
            setupMobileToggleListener(this);
            setupMobileMenuItemListener(this);
        }, // #! init
        destroy: function() {
            // Remove any event listeners and undo any "init" actions here...
        },
    };
    return Plugin;
} ) );