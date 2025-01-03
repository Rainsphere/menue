# Contributing to Menue

Thank you for your interest in contributing to Menue!

## Development Process

1. Clone the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## Setup

```bash
git clone https://github.com/yourusername/menue.git
cd menue
npm install
```

## Building

```bash
npm run build    # Build for production
npm run watch    # Development with auto-rebuild
```

## Code Standards

### JavaScript

- Use ES6+ features
- Add JSDoc comments for functions
- Use meaningful variable names
- Keep functions focused and small

### Example

```javascript
/**
 * Toggle menu state
 * @param {HTMLElement} element - Menu element
 * @param {boolean} state - Desired state
 */
function toggleMenu(element, state) {
    element.classList.toggle('is-open', state);
}
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test across different browsers

## Pull Request Process

1. Update documentation
2. Add tests if needed
3. Update CHANGELOG.md
4. Submit PR with clear description

## Questions?

Open an issue or contact maintainers directly.