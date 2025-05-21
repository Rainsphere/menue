// Define spies that will be assigned to Menue.prototype by the mocked mixins.
const mockPrototypeInit = jest.fn();
const mockPrototypeDestroy = jest.fn();

// Mock the mixins. These are hoisted by Jest.
jest.mock('./init', () => ({
    initMixin: jest.fn(MenueConstructor => {
        MenueConstructor.prototype.init = mockPrototypeInit;
    }),
}));
jest.mock('./destroy', () => ({
    destroyMixin: jest.fn(MenueConstructor => {
        MenueConstructor.prototype.destroy = mockPrototypeDestroy;
    }),
}));

// Import default variables (not used in this file directly, but good for context)
// import { defaults as menueDefaults } from './variables';

describe('Menue Main', () => {
    let Menue;
    let initMixinMock;
    let destroyMixinMock;
    let userOptions;

    beforeEach(() => {
        jest.resetModules();

        initMixinMock = require('./init').initMixin;
        destroyMixinMock = require('./destroy').destroyMixin;

        initMixinMock.mockClear();
        destroyMixinMock.mockClear();

        Menue = require('./main').default;

        mockPrototypeInit.mockClear();
        mockPrototypeDestroy.mockClear();

        userOptions = {
            desktopMenuSelector: '.test-desktop-menu',
            // any other specific options for testing
        };
    });

    it('should call initMixin and destroyMixin upon module load and correctly setup Menue.prototype', () => {
        expect(initMixinMock).toHaveBeenCalledTimes(1);
        expect(initMixinMock).toHaveBeenCalledWith(Menue);
        expect(Menue.prototype.init).toBe(mockPrototypeInit);

        expect(destroyMixinMock).toHaveBeenCalledTimes(1);
        expect(destroyMixinMock).toHaveBeenCalledWith(Menue);
        expect(Menue.prototype.destroy).toBe(mockPrototypeDestroy);
    });

    it('should create an instance of Menue, and prototype.init should be called by constructor', () => {
        const menueInstance = new Menue(userOptions);
        expect(menueInstance).toBeInstanceOf(Menue);
        expect(mockPrototypeInit).toHaveBeenCalledTimes(1);
    });

    it('should call prototype.init with userOptions when Menue is instantiated with options', () => {
        new Menue(userOptions);
        // According to the new understanding, main.js constructor calls this.init(options) with raw options.
        expect(mockPrototypeInit).toHaveBeenCalledWith(userOptions);
    });

    it('should call prototype.init with undefined when Menue is instantiated with no arguments', () => {
        new Menue(); // No arguments
        // main.js constructor calls this.init(options). If options is undefined, it's called with undefined.
        expect(mockPrototypeInit).toHaveBeenCalledWith(undefined);
    });

    // The test 'should NOT call prototype.init if options.init is explicitly false' is removed
    // as the main.js constructor is assumed to call this.init() unconditionally.
    // The processing of an 'init: false' option would occur within Menue.prototype.init itself (tested in init.test.js).
});
