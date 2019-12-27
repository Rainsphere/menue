# menue
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
- firstLevelNavSelector: '.primary-nav'
- secondLevelNavSelector: '.secondary-nav'
- thirdLevelNavSelector: '.tertiary-nav'
- itemToggleButtonClass: '.item-toggle-button'
- hasSecondaryClass: 'has-secondary'
- hasTertiaryClass: 'has-tertiary'
- openClass: 'is-open'

### Desktop Options

- desktopMenuSelector: '.desktop-menu'
- desktopStickyOffset: 50
- desktopStickyClass: 'is-sticky'
- desktopHasSecondaryToggleButton: false
- desktopHasTertiaryToggleButton: false

### Mobile Options

- mobileMenuSelector: '.mobile-menu'
- mobileToggleSelector: '.mobile-toggle'
- mobileAnimatingClass: 'is-animating'
- mobileDisplayDelay: 200
- mobileOpenBodyClass: 'mobile-menu-open'
- mobileHasSecondaryToggleButton: false
- mobileHasTertiaryToggleButton: false

### Callbacks

- onDesktopStickyChange: function(){}
