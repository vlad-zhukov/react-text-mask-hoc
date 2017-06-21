/* eslint-disable no-underscore-dangle, react/prop-types */

import React, {Component} from 'react';
import {mount} from 'enzyme';
import emailMask from 'text-mask-addons/dist/emailMask';
import {createMaskedComponent, InputAdapter} from '../src/index';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function setup(options = {}) {
    const opts = {
        mask: PHONE_MASK,
        guide: true,
        ...options,
    };

    const MaskedInput = createMaskedComponent(InputAdapter);

    class StatefulWrapper extends Component {
        state = {
            value: this.props.value || '',
        };

        _onChange = jest.fn((event) => {
            this.setState({value: event.target.value});
        });

        _componentRef = jest.fn((ref) => {
            this._component = ref;
        });

        _getRef = (ref) => {
            this._ref = ref;
        };

        render() {
            const {value, ...rest} = this.props;
            return (
                <MaskedInput
                    {...rest}
                    value={this.state.value}
                    onChange={this._onChange}
                    componentRef={this._componentRef}
                    ref={this._getRef}
                />
            );
        }
    }

    const wrapper = mount(<StatefulWrapper {...opts} />);
    const component = wrapper.find(MaskedInput);
    const inputAdapter = component.find(InputAdapter);
    const input = inputAdapter.find('input');

    return {
        wrapper,
        component,
        inputAdapter,
        input,
    };
}

describe('InputAdapter', () => {
    it('does not throw when instantiated', () => {
        expect(() => createMaskedComponent(InputAdapter)).not.toThrow();
    });

    it('does not throw when mounted', () => {
        const MaskedInput = createMaskedComponent(InputAdapter);

        expect(() => mount(<MaskedInput mask={PHONE_MASK} />)).not.toThrow();
    });

    it('renders a single InputAdapter element', () => {
        const {inputAdapter} = setup();

        expect(inputAdapter).toHaveLength(1);
    });

    it('renders a single input element', () => {
        const {input} = setup();

        expect(input).toHaveLength(1);
    });

    it('initializes reference to an input element', () => {
        const {wrapper} = setup();
        const wrapperInstance = wrapper.instance();

        expect(wrapperInstance._componentRef).toHaveBeenCalledTimes(1);
        expect(wrapperInstance._component).toBeInstanceOf(HTMLInputElement);
    });

    it('initializes textMaskInputElement property', () => {
        const {wrapper} = setup();
        const maskedInput = wrapper.instance()._ref;

        expect(maskedInput.textMaskInputElement).toBeDefined();
        expect(typeof maskedInput.textMaskInputElement).toBe('object');
        expect(typeof maskedInput.textMaskInputElement.state).toBe('object');
        expect(typeof maskedInput.textMaskInputElement.state.previousConformedValue).toBe('string');
        expect(typeof maskedInput.textMaskInputElement.update).toBe('function');
    });

    it('throws if mask property was not set', () => {
        expect(() => setup({mask: null})).toThrow();
    });

    it('accepts function as mask property', () => {
        const {input} = setup({
            value: '12345',
            mask: (value) => {
                expect(value).toBe('12345');
                return PHONE_MASK;
            },
        });

        expect(input.getDOMNode().value).toBe('(123) 45_-____');
    });

    it('accepts object as mask property', () => {
        const {input} = setup({value: 'abc', mask: emailMask});

        expect(input.getDOMNode().value).toBe('abc@ .');
    });

    it('accepts pipe function', () => {
        const {input} = setup({
            value: '12345',
            pipe: (value) => {
                expect(value).toBe('(123) 45_-____');
                return 'abc';
            },
        });

        expect(input.getDOMNode().value).toBe('abc');
    });

    it('renders correctly with an undefined value', () => {
        const {input} = setup({value: undefined});

        expect(input.getDOMNode().value).toBe('');
    });

    it('renders correctly with an initial value', () => {
        const {input} = setup({value: 123});

        expect(input.getDOMNode().value).toBe('(123) ___-____');
    });

    it('renders mask instead of empty string when showMask is true', () => {
        const {input} = setup({showMask: true});

        expect(input.getDOMNode().value).toBe('(___) ___-____');
    });

    it('does not render mask instead of empty string when showMask is false', () => {
        const {input} = setup({showMask: false});

        expect(input.getDOMNode().value).toBe('');
    });

    it('creates a new textMaskInputElement when initTextMask() is called', () => {
        const {wrapper} = setup();
        const maskedInput = wrapper.instance()._ref;
        const cachedTextMaskInputElement = maskedInput.textMaskInputElement;

        maskedInput.initTextMask();

        expect(cachedTextMaskInputElement).not.toBe(maskedInput.textMaskInputElement);
    });

    it('does not render masked characters', () => {
        const {input} = setup({value: 'abc'});

        expect(input.getDOMNode().value).toBe('');
    });

    it('does not allow masked characters', () => {
        const {input} = setup();
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('');
        input.node.value = 'abc';
        input.simulate('change');
        expect(inputElement.value).toBe('');
    });

    it('can be disabled by setting the mask to false', () => {
        const {input} = setup({value: 'abc', mask: false});
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('abc');
        input.node.value = 'def';
        input.simulate('change');
        expect(input.getDOMNode().value).toBe('def');
    });

    it('can call textMaskInputElement.update() to update the inputElement.value', () => {
        const {wrapper, input} = setup();
        const maskedInput = wrapper.instance()._ref;
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('');
        inputElement.value = '12345';
        maskedInput.textMaskInputElement.update();
        expect(inputElement.value).toBe('(123) 45_-____');
    });

    it('can pass value to textMaskInputElement.update()', () => {
        const {wrapper, input} = setup({value: '123'});
        const maskedInput = wrapper.instance()._ref;
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('(123) ___-____');
        maskedInput.textMaskInputElement.update('12345');
        expect(inputElement.value).toBe('(123) 45_-____');
    });

    it('can pass textMaskConfig to textMaskInputElement.update()', () => {
        const {wrapper, input} = setup({value: '123', mask: false});
        const maskedInput = wrapper.instance()._ref;
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('123');
        maskedInput.textMaskInputElement.update('12345', {inputElement, mask: PHONE_MASK});
        expect(inputElement.value).toBe('(123) 45_-____');
    });

    it('calls textMaskInputElement.update() and props.onChange() when an input event is received', () => {
        const {wrapper, input} = setup();
        const wrapperInstance = wrapper.instance();
        const maskedInput = wrapperInstance._ref;

        const updateSpy = jest.spyOn(maskedInput.textMaskInputElement, 'update');
        input.simulate('change');

        expect(wrapperInstance._onChange).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('calls textMaskInputElement.update() when an input event is received when props.onChange() is not set', () => {
        const {wrapper, input} = setup();
        const wrapperInstance = wrapper.instance();
        const maskedInput = wrapperInstance._ref;

        const updateSpy = jest.spyOn(maskedInput.textMaskInputElement, 'update');
        wrapperInstance._onChange = undefined;
        input.simulate('change');

        expect(wrapperInstance._onChange).not.toBeDefined();
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });

    it('calls textMaskInputElement.update() via onChange()', () => {
        const {wrapper, input} = setup({value: '123'});
        const maskedInput = wrapper.instance()._ref;
        const inputElement = input.getDOMNode();

        const updateSpy = jest.spyOn(maskedInput.textMaskInputElement, 'update');

        expect(inputElement.value).toBe('(123) ___-____');
        expect(updateSpy).toHaveBeenCalledTimes(0);

        maskedInput._onChange({target: {value: '12345'}});

        expect(inputElement.value).toBe('(123) 45_-____');
        expect(updateSpy).toHaveBeenCalledTimes(1);
    });
});
