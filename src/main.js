import { destroyMixin } from './destroy';
import { initMixin } from './init';

export default function Menue(options) {
    this.init(options);
}

initMixin(Menue);
destroyMixin(Menue);
