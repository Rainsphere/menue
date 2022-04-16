export function setupDesktopMenuItemListener(menue) {
    const itemToggleButtonClass = menue.$options.itemToggleButtonClass;
    if (menue.$options.desktopHasSecondaryToggleButton) {
        //Listen for toggle button clicks to open/close the secondary-nav
        const primaryToggleButtons = menue._desktopMenu.querySelectorAll(
            menue.$options.firstLevelNavSelector +
                " > ul > li > " +
                itemToggleButtonClass
        );

        for (let i = 0; i < primaryToggleButtons.length; i++) {
            const primToggleButton = primaryToggleButtons[i];
            primToggleButton.addEventListener("click", function () {
                var secondaryNav = this.parentNode.querySelector(
                    menue.$options.secondLevelNavSelector
                );
                if (!this.classList.contains(menue.$options.openClass)) {
                    if (secondaryNav) {
                        this.parentNode.classList.add(menue.$options.openClass);
                        this.classList.add(menue.$options.openClass);
                        secondaryNav.classList.add(menue.$options.openClass);
                    }
                } else {
                    if (secondaryNav) {
                        this.parentNode.classList.remove(
                            menue.$options.openClass
                        );
                        this.classList.remove(menue.$options.openClass);
                        secondaryNav.classList.remove(menue.$options.openClass);
                    }
                }

                menue.$options.onDesktopPrimaryToggleClick(this, menue);
            });
        }
    }

    if (menue.$options.desktopHasTertiaryToggleButton) {
        //Listen for close button clicks to open/close the tertiary-nav
        const secondaryToggleButtons = menue._desktopMenu.querySelectorAll(
            menue.$options.secondLevelNavSelector +
                " > ul > li > " +
                itemToggleButtonClass
        );
        for (let s = 0; s < secondaryToggleButtons.length; s++) {
            const secToggleButton = secondaryToggleButtons[s];
            secToggleButton.addEventListener("click", function () {
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
