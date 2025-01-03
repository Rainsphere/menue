import { removeStickyListener } from './sticky';
import { removeMobileToggleListener } from './mobile';
export function destroyMixin(Menue) {
    Menue.prototype.destroy = function () {
        removeStickyListener();
        removeMobileToggleListener(this);
    };
}
