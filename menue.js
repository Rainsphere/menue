/**
 * MIT License
 * 
 * Copyright (c) 2019 David Spencer
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * @author David Spencer
 * @version 1.0.0
 * 
 * https://github.com/Rainsphere/menue
 *
 * Created at     : 2019-12-23 09:43:09 
 * Last modified  : 2019-12-28 11:31:46
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
       
            var scrollTop = window.pageYOffset;
         
            if(scrollTop >= instance.options.desktopStickyOffset)
            {
                if(!instance.desktopMenu.classList.contains(instance.options.desktopStickyClass))
                {
                    instance.desktopMenu.classList.add(instance.options.desktopStickyClass);
                    instance.options.onDesktopStickyChange(instance);
                }
                
            }
            else
            {
                if(instance.desktopMenu.classList.contains(instance.options.desktopStickyClass))
                {
                    instance.desktopMenu.classList.remove(instance.options.desktopStickyClass);
                    instance.options.onDesktopStickyChange(instance);
                }
            }
        });
    };

    var removeStickyListener = function()
    {
        window.removeEventListener('scroll');
    }

    var setupMobileToggleListener = function(instance){
        var bodyEl = document.querySelectorAll( 'body' )[0];

        for(var i = 0; i < instance.mobileToggle.length; i++){
            var toggle = instance.mobileToggle[i];
            toggle.addEventListener('click', function(){
                if(instance.mobileOpen)
                {
                        instance.mobileMenu.classList.add(instance.options.mobileAnimatingClass);
                        setTimeout(function(){
                            bodyEl.classList.remove(instance.options.mobileOpenBodyClass);
                            instance.mobileMenu.classList.remove(instance.options.openClass);
                            instance.mobileMenu.classList.remove(instance.options.mobileAnimatingClass);
                            instance.mobileOpen = false;
                        }, instance.options.mobileDisplayDelay);
                }
                else{
                   
                        instance.mobileMenu.classList.add(instance.options.mobileAnimatingClass);
                        bodyEl.classList.add(instance.options.mobileOpenBodyClass);
                        setTimeout(function(){
                            instance.mobileMenu.classList.add(instance.options.openClass);
                            instance.mobileMenu.classList.remove(instance.options.mobileAnimatingClass);
                            instance.mobileOpen = true;
                        }, instance.options.mobileDisplayDelay);
                   
                    
                }
                instance.options.onMobileToggleClick(this, instance);
            });
        }
    }

    var removeMobileToggleListener = function(instance){
        for(var i = 0; i < instance.mobileToggle.length; i++){
            instance.mobileToggle[i].removeEventListener('click');
        }
    }

    var setupMobileClasses = function(instance){
        var primaryItems = instance.mobileMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li');

        //check for secondary nav
        for(var i = 0; i < primaryItems.length; i++)
        {
            var secondaryItem = primaryItems[i].querySelector(instance.options.secondLevelNavSelector);
            if(secondaryItem)
            {
                //we have secondary nav
                primaryItems[i].classList.add(instance.options.hasSecondaryClass);
                //check for tertiary nav
                var secondaryItems = secondaryItem.querySelectorAll('ul > li');
                for(var j = 0; j < secondaryItems.length; j++){
                    var tertiaryItem = secondaryItems[j].querySelector(instance.options.thirdLevelNavSelector);
                    if(tertiaryItem)
                    {   
                        secondaryItems[j].classList.add(instance.options.hasTertiaryClass);
                    }
                }
            }

        }
    }

    var setupDesktopMenuItemListener = function(instance){
        if(instance.options.desktopHasSecondaryToggleButton){
            //Listen for close button clicks to open/close the secondary-nav
            var primaryToggleButtons = instance.desktopMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li > ' + instance.options.itemToggleButtonClass);
            for(var i = 0; i < primaryToggleButtons.length; i++)
            {
                var primToggleButton = primaryToggleButtons[i];
                primToggleButton.addEventListener('click', function(){
                    var secondaryNav = this.parentNode.querySelector(instance.options.secondLevelNavSelector);
                    if(!this.classList.contains(instance.options.openClass))
                    {
                        if(secondaryNav) {
                            this.classList.add(instance.options.openClass);
                            secondaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        if(secondaryNav) {
                            this.classList.remove(instance.options.openClass);
                            secondaryNav.classList.remove(instance.options.openClass);
                        }
                    }

                    instance.options.onDesktopPrimaryToggleClick(this, instance);
                });
            }
        }

        if(instance.options.desktopHasTertiaryToggleButton){
            //Listen for close button clicks to open/close the tertiary-nav
            var secondaryToggleButtons = instance.desktopMenu.querySelectorAll(instance.options.secondLevelNavSelector + ' > ul > li > ' + instance.options.itemToggleButtonClass);
            for(var s = 0; s < secondaryToggleButtons.length; s++){
                var secToggleButton = secondaryToggleButtons[s];
                secToggleButton.addEventListener('click', function(){
                    var tertiaryNav = this.parentNode.querySelector(instance.options.thirdLevelNavSelector);
                    if(!this.classList.contains(instance.options.openClass))
                    {
                        if(tertiaryNav) {
                            this.classList.add(instance.options.openClass);
                            tertiaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        if(tertiaryNav) {
                            this.classList.remove(instance.options.openClass);
                            tertiaryNav.classList.remove(instance.options.openClass);
                        }
                    }
                    instance.options.onDesktopSecondaryToggleClick(this, instance);
                });
            }
        }
    }

    var setupMobileMenuItemListener = function(instance){
        if(instance.options.mobileHasSecondaryToggleButton){
            //Listen for close button clicks to open/close the secondary-nav
            var primaryToggleButtons = instance.mobileMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li > ' + instance.options.itemToggleButtonClass);
            for(var i = 0; i < primaryToggleButtons.length; i++){
                var primToggleButton = primaryToggleButtons[i];
                primToggleButton.addEventListener('click', function(){
                    var secondaryNav = this.parentNode.querySelector(instance.options.secondLevelNavSelector);
                    if(!this.classList.contains(instance.options.openClass))
                    {
                        if(secondaryNav) {
                            this.classList.add(instance.options.openClass);
                            secondaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        if(secondaryNav) {
                            this.classList.remove(instance.options.openClass);
                            secondaryNav.classList.remove(instance.options.openClass);
                        }
                    }
                    instance.options.onMobilePrimaryToggleClick(this, instance);
                });
            }
           
        }else{
            //Listen for anchor clicks to open/close the secondary-nav
            var primaryAnchors = instance.mobileMenu.querySelectorAll(instance.options.firstLevelNavSelector + ' > ul > li > a');
            for(var a = 0; i < primaryAnchors.length; a++){
                var anchor = primaryAnchors[a];
                anchor.addEventListener('click', function(event){
                    var resetAll = function(){
                        for(var j = 0; j < primaryAnchors.length; j++){
                            primaryAnchors[j].classList.remove(instance.options.openClass);
                        }
                     
                        var allSecondaryNavs= instance.mobileMenu.querySelectorAll(instance.options.secondLevelNavSelector);
                        for(var k = 0; k < allSecondaryNavs.length; k++)
                        {
                            allSecondaryNavs[k].classList.remove(instance.options.openClass);
                        }
                    }

                    if(!this.classList.contains(instance.options.openClass) && this.parentNode.classList.contains(instance.options.hasSecondaryClass))
                    {
                        event.preventDefault();
                        resetAll();
                        
                        var secondaryNav = this.parentNode.querySelector(instance.options.secondLevelNavSelector);
                        if(secondaryNav) {
                            this.classList.add(instance.options.openClass);
                            secondaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        resetAll();
                    }
                    this.options.onMobilePrimaryAnchorClick(this, instance);
                });
            }
         
        }
        if(instance.options.mobileHasTertiaryToggleButton){
            //Listen for close button clicks to open/close the tertiary-nav
            var secondaryToggleButtons = instance.mobileMenu.querySelectorAll(instance.options.secondLevelNavSelector + ' > ul > li > ' + instance.options.itemToggleButtonClass);
            for(var l = 0; l < secondaryToggleButtons.length; l++){
                var secTogButton = secondaryToggleButtons[l];
                secTogButton.addEventListener('click', function(){
                    var tertiaryNav = this.parentNode.querySelector(instance.options.thirdLevelNavSelector);
                    if(!this.classList.contains(instance.options.openClass))
                    {
                        if(tertiaryNav) {
                            this.classList.add(instance.options.openClass);
                            tertiaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        if(tertiaryNav) {
                            this.classList.remove(instance.options.openClass);
                            tertiaryNav.classList.remove(instance.options.openClass);
                        }
                    }
                    instance.options.onMobileSecondaryToggleClick(this, instance);
                });
            }
           
        }else{
             //Listen for anchor clicks to open/close the tertiary-nav
             var secondaryAnchors = instance.mobileMenu.querySelectorAll(instance.options.secondLevelNavSelector + ' > ul > li > a');
             
             for(var m = 0; m < secondaryAnchors.length; m++){
                 var secAnchor = secondaryAnchors[m];
                 secAnchor.addEventListener('click', function(event){
                    var resetAll = function(){
                        for(var j = 0; j < secondaryAnchors.length; j++){
                            secondaryAnchors[j].classList.remove(instance.options.openClass);
                        }

                        var allTertiaryNavs= anchor.parentNode.parentNode.querySelectorAll(instance.options.thirdLevelNavSelector);
                        for(var k = 0; k < allTertiaryNavs.length; k++){
                            allTertiaryNavs[k].classList.remove(instance.options.openClass);
                        }
                    }

                    if(!this.classList.contains(instance.options.openClass) && this.parentNode.classList.contains(instance.options.hasTertiaryClass))
                    {
                        event.preventDefault();
                        resetAll();
                        
                        var tertiaryNav = this.parentNode.querySelector(instance.options.thirdLevelNavSelector);
                        if(tertiaryNav) {
                            this.classList.add(instance.options.openClass);
                            tertiaryNav.classList.add(instance.options.openClass);
                        }
                    }
                    else{
                        resetAll();
                    }
                    this.options.onMobileSecondaryAnchorClick(this, instance);
                });
             }
        }
    }

    /**
     * Plugin Object
     * @param {Object} options User options
     * @constructor
     */
    function Plugin( options ) {
        this.options = extend( defaults, options );
        this.init();
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
            setupDesktopMenuItemListener(this);
            setupMobileClasses(this);
            setupMobileToggleListener(this);
            setupMobileMenuItemListener(this);
        }, // #! init
        destroy: function() {
            removeStickyListener();
            removeMobileToggleListener(this);
        },
    };
    return Plugin;
} ) );