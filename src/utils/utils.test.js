import { extend, toggleClass, closest, handleToggleClick } from './index';

describe('Utils Tests', () => {
    describe('extend', () => {
        it('should merge two simple objects', () => {
            const target = { a: 1, b: 2 };
            const options = { c: 3, d: 4 };
            const result = extend(target, options);
            expect(result).toEqual({ a: 1, b: 2, c: 3, d: 4 });
        });

        it('should override target properties with options properties', () => {
            const target = { a: 1, b: 2 };
            const options = { b: 3, c: 4 };
            const result = extend(target, options);
            expect(result).toEqual({ a: 1, b: 3, c: 4 });
        });

        it('should work with an empty options object', () => {
            const target = { a: 1, b: 2 };
            const options = {};
            const result = extend(target, options);
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should work with an empty target object', () => {
            const target = {};
            const options = { a: 1, b: 2 };
            const result = extend(target, options);
            expect(result).toEqual({ a: 1, b: 2 });
        });

        it('should not modify the original objects', () => {
            const target = { a: 1 };
            const options = { b: 2 };
            extend(target, options);
            expect(target).toEqual({ a: 1 });
            expect(options).toEqual({ b: 2 });
        });
    });

    describe('toggleClass', () => {
        let mockElement;

        beforeEach(() => {
            mockElement = document.createElement('div');
            jest.spyOn(mockElement.classList, 'add');
            jest.spyOn(mockElement.classList, 'remove');
            jest.spyOn(mockElement.classList, 'toggle');
        });

        it('should add class when force is true', () => {
            toggleClass(mockElement, 'test-class', true);
            expect(mockElement.classList.add).toHaveBeenCalledWith(
                'test-class'
            );
            expect(mockElement.classList.remove).not.toHaveBeenCalled();
            expect(mockElement.classList.toggle).not.toHaveBeenCalled();
        });

        it('should remove class when force is false', () => {
            toggleClass(mockElement, 'test-class', false);
            expect(mockElement.classList.remove).toHaveBeenCalledWith(
                'test-class'
            );
            expect(mockElement.classList.add).not.toHaveBeenCalled();
            expect(mockElement.classList.toggle).not.toHaveBeenCalled();
        });

        it('should toggle class on when not present and force is undefined', () => {
            // classList.toggle will add it
            toggleClass(mockElement, 'test-class');
            expect(mockElement.classList.toggle).toHaveBeenCalledWith(
                'test-class'
            );
            expect(mockElement.classList.add).not.toHaveBeenCalled();
            expect(mockElement.classList.remove).not.toHaveBeenCalled();
        });

        it('should toggle class off when present and force is undefined', () => {
            mockElement.classList.add('test-class'); // Make it present
            // Reset spy for 'add' to ignore the setup call
            mockElement.classList.add.mockClear();

            toggleClass(mockElement, 'test-class'); // classList.toggle will remove it

            expect(mockElement.classList.toggle).toHaveBeenCalledWith(
                'test-class'
            );
            expect(mockElement.classList.add).not.toHaveBeenCalled(); // Ensure add is not called by toggle
            expect(mockElement.classList.remove).not.toHaveBeenCalled(); // Ensure remove is not directly called by toggleClass
        });
    });

    describe('closest', () => {
        let mockElement;
        let mockClosestFn;

        beforeEach(() => {
            mockClosestFn = jest.fn();
            mockElement = {
                closest: mockClosestFn,
            };
        });

        it('should call element.closest with the correct selector', () => {
            closest(mockElement, '.test-selector');
            expect(mockClosestFn).toHaveBeenCalledWith('.test-selector');
        });

        it('should return what element.closest returns', () => {
            const parentElement = document.createElement('div');
            mockClosestFn.mockReturnValue(parentElement);
            const result = closest(mockElement, '.test-selector');
            expect(result).toBe(parentElement);
        });
    });

    describe('handleToggleClick', () => {
        let mockParent;
        let mockToggleButton;
        let mockSecondaryNav;
        let mockOptions;
        let mockCallback;
        let mockEvent;

        beforeEach(() => {
            // Create DOM structure
            mockParent = document.createElement('div');
            // Use innerHTML to define children, then query them
            mockParent.innerHTML = `
        <button class="test-toggle-button"></button>
        <div class="secondary-nav"></div>
      `;
            document.body.appendChild(mockParent);

            // Query the elements from the live parent
            mockToggleButton = mockParent.querySelector('.test-toggle-button');
            mockSecondaryNav = mockParent.querySelector('.secondary-nav');

            mockOptions = {
                openClass: 'is-open',
                secondLevelNavSelector: '.secondary-nav',
            };
            mockCallback = jest.fn();

            // Create a base mock event object that can be recognized as an Event instance
            let rawEvent = {
                preventDefault: jest.fn(),
                currentTarget: mockToggleButton, // This is now an element queried from the live DOM
            };
            Object.setPrototypeOf(rawEvent, Event.prototype);
            mockEvent = rawEvent; // Corrected: removed extra closing brace

            // Spy on classList methods
            jest.spyOn(mockParent.classList, 'add');
            jest.spyOn(mockParent.classList, 'remove');
            jest.spyOn(mockToggleButton.classList, 'add');
            jest.spyOn(mockToggleButton.classList, 'remove');
            jest.spyOn(mockSecondaryNav.classList, 'add');
            jest.spyOn(mockSecondaryNav.classList, 'remove');
        });

        afterEach(() => {
            // Clean up the DOM
            if (mockParent && mockParent.parentNode === document.body) {
                document.body.removeChild(mockParent);
            }
            jest.restoreAllMocks(); // Clears spies for the next test
        });

        describe('with Event object', () => {
            it('should call event.preventDefault', () => {
                handleToggleClick(mockEvent, mockOptions, mockCallback);
                expect(mockEvent.preventDefault).toHaveBeenCalled();
            });

            it('should add openClass when not open', () => {
                handleToggleClick(mockEvent, mockOptions, mockCallback);
                expect(mockParent.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockToggleButton.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockSecondaryNav.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockCallback).toHaveBeenCalledWith(mockToggleButton);
            });

            it('should remove openClass when already open', () => {
                // Make it open first
                mockToggleButton.classList.add('is-open');
                handleToggleClick(mockEvent, mockOptions, mockCallback);
                expect(mockParent.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockToggleButton.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockSecondaryNav.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockCallback).toHaveBeenCalledWith(mockToggleButton);
            });
        });

        describe('with Element object', () => {
            it('should add openClass when not open', () => {
                handleToggleClick(mockToggleButton, mockOptions, mockCallback);
                expect(mockParent.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockToggleButton.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockSecondaryNav.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockCallback).toHaveBeenCalledWith(mockToggleButton);
            });

            it('should remove openClass when already open', () => {
                mockToggleButton.classList.add('is-open');
                handleToggleClick(mockToggleButton, mockOptions, mockCallback);
                expect(mockParent.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockToggleButton.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockSecondaryNav.classList.remove).toHaveBeenCalledWith(
                    'is-open'
                );
                expect(mockCallback).toHaveBeenCalledWith(mockToggleButton);
            });
        });

        describe('Edge cases', () => {
            it('should do nothing if eventOrElement is null', () => {
                handleToggleClick(null, mockOptions, mockCallback);
                expect(mockCallback).not.toHaveBeenCalled();
                expect(mockParent.classList.add).not.toHaveBeenCalled();
            });

            it('should do nothing if options is null', () => {
                // Ensure mockEvent is an "Event instance" for this test too
                let eventForNoOptionsTest = {
                    preventDefault: jest.fn(),
                    currentTarget: mockToggleButton,
                };
                Object.setPrototypeOf(eventForNoOptionsTest, Event.prototype);

                handleToggleClick(eventForNoOptionsTest, null, mockCallback);
                // The function should return early before preventDefault is called if options is null
                expect(
                    eventForNoOptionsTest.preventDefault
                ).not.toHaveBeenCalled();
                expect(mockCallback).not.toHaveBeenCalled();
            });

            it('should do nothing if currentTarget (toggle) is null in Event', () => {
                let nullTargetEvent = {
                    preventDefault: jest.fn(),
                    currentTarget: null,
                };
                Object.setPrototypeOf(nullTargetEvent, Event.prototype); // Make it instanceof Event

                handleToggleClick(nullTargetEvent, mockOptions, mockCallback);

                expect(nullTargetEvent.preventDefault).toHaveBeenCalled(); // preventDefault is called before the null check for toggle
                // Callback and DOM changes should not occur because toggle is null
                expect(mockCallback).not.toHaveBeenCalled();
                expect(mockParent.classList.add).not.toHaveBeenCalled();
            });

            it('should do nothing if element is null when passed directly', () => {
                handleToggleClick(null, mockOptions, mockCallback);
                expect(mockCallback).not.toHaveBeenCalled();
                expect(mockParent.classList.add).not.toHaveBeenCalled();
            });

            it('should do nothing if secondaryNav is not found', () => {
                // Detach secondaryNav from parent to simulate not found
                if (mockSecondaryNav.parentNode === mockParent) {
                    mockParent.removeChild(mockSecondaryNav);
                }
                // mockEvent from beforeEach is already an "Event instance"
                handleToggleClick(mockEvent, mockOptions, mockCallback);

                expect(mockEvent.preventDefault).toHaveBeenCalled();
                // No DOM changes should occur if secondaryNav is not found
                expect(mockParent.classList.add).not.toHaveBeenCalled();
                expect(mockToggleButton.classList.add).not.toHaveBeenCalled();
                // No class changes and callback not called
                expect(mockCallback).not.toHaveBeenCalled();
            });

            it('should still toggle classes if callback is not a function', () => {
                // mockEvent from beforeEach is already an "Event instance"
                handleToggleClick(mockEvent, mockOptions, 'not-a-function');
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(mockParent.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
            });

            it('should still toggle classes if callback is undefined', () => {
                // mockEvent from beforeEach is already an "Event instance"
                handleToggleClick(mockEvent, mockOptions, undefined);
                expect(mockEvent.preventDefault).toHaveBeenCalled();
                expect(mockParent.classList.add).toHaveBeenCalledWith(
                    'is-open'
                );
            });
        });
    });
});
