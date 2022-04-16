# Menue

Vanilla Javascript menu manager.

## Usage

### Initializing

```
<script>
  var menue = new Menue({});
</script>
```

### Basic Markup

The basic markup uses unsorted lists to organize the menu items

#### Desktop

```
...
<div class="desktop-menu">
  <nav class="primary-nav">
    <ul>
      <li>
        <a href='#'>Menu Item 1</a>
        <div class="secondary-nav">
          <ul>
            <li>
              <a href=''>Secondary Menu Item 1</a>
              <div class="tertiary-nav">
                <ul>
                  <li>
                    <a href=''>Tertiary Menu Item 1</a>
                  </li>
                  <li>
                    <a href=''>Tertiary Menu Item 2</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href=''>Secondary Menu Item 2</a>
            </li>
          </ul>
        </div>
      </li>
      <li>
        <a href=''>Menu Item 2</a>
      </li>
    </ul>
  </nav>
</div>
...
```

#### Mobile

```
...
<div class="mobile-menu">
  <div class="header_bar">
    <div class="mobile-toggle">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" focusable="false">
        <g>
          <rect x="15" y="16" width="18" height="2"></rect>
          <rect x="15" y="23" width="18" height="2"></rect>
          <rect x="15" y="30" width="18" height="2"></rect>
        </g>
      </svg>
    </div>
  </div>
  <nav class="primary-nav">
    <ul>
...
```

## Options

### General Options

-   firstLevelNavSelector: '.primary-nav'
-   secondLevelNavSelector: '.secondary-nav'
-   thirdLevelNavSelector: '.tertiary-nav'
-   itemToggleButtonClass: '.item-toggle-button'
-   hasSecondaryClass: 'has-secondary'
-   hasTertiaryClass: 'has-tertiary'
-   openClass: 'is-open'

### Desktop Options

-   desktopMenuSelector: '.desktop-menu'
-   desktopStickyOffset: 50
-   desktopStickyClass: 'is-sticky'
-   desktopHasSecondaryToggleButton: false
-   desktopHasTertiaryToggleButton: false

### Mobile Options

-   mobileMenuSelector: '.mobile-menu'
-   mobileToggleSelector: '.mobile-toggle'
-   mobileAnimatingClass: 'is-animating'
-   mobileDisplayDelay: 200
-   mobileOpenBodyClass: 'mobile-menu-open'
-   mobileHasSecondaryToggleButton: false
-   mobileHasTertiaryToggleButton: false

### Callbacks

-   onDesktopStickyChange: function(){}
-   onMobileToggleClick: function(toggle, instance){}
-   onDesktopPrimaryToggleClick: function(toggle, instance){}
-   onDesktopSecondaryToggleClick: function(toggle, instance){}
-   onMobilePrimaryToggleClick: function(toggle, instance){}
-   onMobileSecondaryToggleClick: function(toggle, instance){}
-   onMobilePrimaryAnchorClick: function(anchor, instance){}
-   onMobileSecondaryAnchorClick: function(anchor, instance){}

## License

MIT License

Copyright (c) 2019-2022 David Spencer

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
