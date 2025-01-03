import { handleToggleClick } from './utils';

export function setupDesktopMenuItemListener(menue) {
    const {
        itemToggleButtonClass,
        firstLevelNavSelector,
        secondLevelNavSelector,
    } = menue.$options;

    if (menue.$options.desktopHasSecondaryToggleButton) {
        const primaryToggleButtons = menue._desktopMenu.querySelectorAll(
            `${firstLevelNavSelector} > ul > li > ${itemToggleButtonClass}`
        );

        primaryToggleButtons.forEach(button => {
            button.addEventListener('click', function () {
                const secondaryNav = this.parentNode.querySelector(
                    secondLevelNavSelector
                );
                handleToggleClick(this, secondaryNav, menue.$options, toggle =>
                    menue.$options.onDesktopPrimaryToggleClick(toggle, menue)
                );
            });
        });
    }

    if (menue.$options.desktopHasTertiaryToggleButton) {
        //Listen for close button clicks to open/close the tertiary-nav
        const secondaryToggleButtons = menue._desktopMenu.querySelectorAll(
            menue.$options.secondLevelNavSelector +
                ' > ul > li > ' +
                itemToggleButtonClass
        );
        for (let s = 0; s < secondaryToggleButtons.length; s++) {
            const secToggleButton = secondaryToggleButtons[s];
            secToggleButton.addEventListener('click', function () {
                const tertiaryNav = this.parentNode.querySelector(
                    menue.$options.thirdLevelNavSelector
                );
                if (!this.classList.contains(menue.$options.openClass)) {
                    if (tertiaryNav) {
                        this.parentNode.classList.add(menue.$options.openClass);
                        this.classList.add(menue.$options.openClass);
                        tertiaryNav.classList.add(menue.$options.openClass);
                    }
                } else {
                    if (tertiaryNav) {
                        this.parentNode.classList.remove(
                            menue.$options.openClass
                        );
                        this.classList.remove(menue.$options.openClass);
                        tertiaryNav.classList.remove(menue.$options.openClass);
                    }
                }
                menue.$options.onDesktopSecondaryToggleClick(this, menue);
            });
        }
    }
}
