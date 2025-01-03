# Menue

A flexible navigation management system for responsive websites.

## Installation

1. Download the latest release from GitHub
2. Include the script in your HTML:
```html
<script src="path/to/menue.min.js"></script>
```

Or import as a module:
```javascript
import Menue from './path/to/menue.js';
```

## Basic Usage

```javascript
const nav = new Menue({
    desktopMenuSelector: '.main-nav',
    mobileMenuSelector: '.mobile-nav',
    mobileToggleSelector: '.nav-toggle'
});
```

## Configuration Options

### General Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `firstLevelNavSelector` | string | '.primary-nav' | Selector for primary navigation |
| `secondLevelNavSelector` | string | '.secondary-nav' | Selector for secondary navigation |
| `thirdLevelNavSelector` | string | '.tertiary-nav' | Selector for tertiary navigation |
| `itemToggleButtonClass` | string | '.item-toggle-button' | Class for toggle buttons |
| `hasSecondaryClass` | string | 'has-secondary' | Class added to items with secondary nav |
| `hasTertiaryClass` | string | 'has-tertiary' | Class added to items with tertiary nav |
| `openClass` | string | 'is-open' | Class added to open menu items |

### Desktop Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `desktopMenuSelector` | string | '.desktop-menu' | Main desktop menu selector |
| `desktopStickyOffset` | number | 50 | Pixels from top before sticky |
| `desktopStickyClass` | string | 'is-sticky' | Class added when menu is sticky |
| `desktopHasSecondaryToggleButton` | boolean | false | Enable secondary toggle buttons |
| `desktopHasTertiaryToggleButton` | boolean | false | Enable tertiary toggle buttons |

### Mobile Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `mobileMenuSelector` | string | '.mobile-menu' | Mobile menu selector |
| `mobileToggleSelector` | string | '.mobile-toggle' | Mobile toggle button selector |
| `mobileAnimatingClass` | string | 'is-animating' | Class during animations |
| `mobileDisplayDelay` | number | 200 | Animation duration in ms |
| `mobileOpenBodyClass` | string | 'mobile-menu-open' | Class added to body |

## Events

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onDesktopStickyChange` | `(instance)` | Called when sticky state changes. The `instance` parameter is the Menue instance. |
| `onMobileToggleClick` | `(toggle, instance)` | Called when mobile menu toggle is clicked. The `toggle` parameter is the clicked button element. |
| `onDesktopPrimaryToggleClick` | `(toggle, instance)` | Called when desktop primary level toggle is clicked. |
| `onDesktopSecondaryToggleClick` | `(toggle, instance)` | Called when desktop secondary level toggle is clicked. |
| `onMobilePrimaryToggleClick` | `(toggle, instance)` | Called when mobile primary level toggle is clicked. |
| `onMobileSecondaryToggleClick` | `(toggle, instance)` | Called when mobile secondary level toggle is clicked. |
| `onMobilePrimaryAnchorClick` | `(anchor, instance)` | Called when mobile primary level anchor is clicked. |
| `onMobileSecondaryAnchorClick` | `(anchor, instance)` | Called when mobile secondary level anchor is clicked. |

Example usage of callbacks:

```javascript
const nav = new Menue({
    onDesktopStickyChange: (instance) => {
        console.log('Menu sticky state changed');
    },
    onMobileToggleClick: (toggle, instance) => {
        console.log('Mobile menu toggled:', toggle);
        analytics.track('mobile_menu_interaction');
    },
    onMobilePrimaryAnchorClick: (anchor, instance) => {
        console.log('Primary link clicked:', anchor.href);
    }
});
```
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`npm install`)
4. Make your changes
5. Run build (`npm run build`)
6. Commit changes (`git commit -m 'Add amazing feature'`)
7. Push to branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Setup

```bash
git clone https://github.com/yourusername/menue.git
cd menue
npm install
npm run watch
```

### Code Style

- Use ES6+ features where appropriate
- Add JSDoc comments for functions
- Follow existing naming conventions
- Write unit tests for new features

## License

MIT License - see LICENSE file for details