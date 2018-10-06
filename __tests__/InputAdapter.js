/* eslint-disable no-underscore-dangle, react/prop-types */

import React, {Component} from 'react';
import emailMask from 'text-mask-addons/dist/emailMask';
import {render} from '../__test-helpers__/reactHelpers';
import {withTextMask, TextMask, InputAdapter} from '../dist/react-text-mask-hoc.cjs';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

function setup(options = {}) {
    const opts = {
        mask: PHONE_MASK,
        guide: true,
        ...options,
    };

    class StatefulWrapper extends Component {
        state = {
            value: this.props.value || '',
        };

        _onChange = jest.fn(event => {
            this.setState({value: event.target.value});
        });

        _componentRef = jest.fn(ref => {
            this._component = ref;
        });

        _getRef = ref => {
            this._ref = ref;
        };

        render() {
            const {value, ...rest} = this.props;
            return (
                <TextMask
                    {...rest}
                    {...this.state}
                    Component={InputAdapter}
                    onChange={this._onChange}
                    componentRef={this._componentRef}
                    ref={this._getRef}
                />
            );
        }
    }

    const wrapper = render(<StatefulWrapper {...opts} />);
    const component = wrapper.find(TextMask);
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
        expect(() => withTextMask(InputAdapter)).not.toThrow();
    });

    it('does not throw when mounted', () => {
        const MaskedInput = withTextMask(InputAdapter);

        expect(() => render(<MaskedInput mask={PHONE_MASK} />)).not.toThrow();
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
        expect(wrapperInstance._component).toBeInstanceOf(InputAdapter);
    });

    it('initializes textMaskTransformer property', () => {
        const {wrapper} = setup();
        const maskedInput = wrapper.instance()._ref;

        expect(maskedInput.textMaskTransformer).toBeDefined();
        expect(typeof maskedInput.textMaskTransformer).toBe('object');
        expect(typeof maskedInput.textMaskTransformer.update).toBe('function');
    });

    it('throws if mask property was not set', () => {
        expect(() => setup({mask: null})).toThrow();
    });

    it('accepts function as mask property', () => {
        const {input} = setup({
            value: '12345',
            mask: value => {
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
            pipe: value => {
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

    it('does not render masked characters', () => {
        const {input} = setup({value: 'abc'});

        expect(input.getDOMNode().value).toBe('');
    });

    it('does not allow masked characters', () => {
        const {wrapper, input} = setup();
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('');
        wrapper.setState({value: 'abc'});
        expect(inputElement.value).toBe('');
    });

    it('can be disabled by setting the mask to false', () => {
        const {wrapper, input} = setup({value: 'abc', mask: false});
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('abc');
        wrapper.setState({value: 'def'});
        expect(inputElement.value).toBe('def');
    });

    it('updates the value with a value prop', () => {
        const {wrapper, input} = setup({value: '123'});
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('(123) ___-____');
        wrapper.setState({value: '12345'});
        expect(inputElement.value).toBe('(123) 45_-____');
    });

    it('updates the mask with a mask prop', () => {
        const {wrapper, input} = setup({value: '123', mask: false});
        const inputElement = input.getDOMNode();

        expect(inputElement.value).toBe('123');
        wrapper.setState({value: '12345', mask: PHONE_MASK});
        expect(inputElement.value).toBe('(123) 45_-____');
    });

    it('calls textMaskTransformer.update() and props.onChange() when an input event is received', () => {
        const {wrapper, input} = setup();
        const wrapperInstance = wrapper.instance();
        const maskedInput = wrapperInstance._ref;
        const inputElement = input.getDOMNode();

        const updateSpy = jest.spyOn(maskedInput.textMaskTransformer, 'update');
        input.simulate('change', {target: {value: '123'}});

        expect(inputElement.value).toBe('(123) ___-____');
        expect(wrapperInstance._onChange).toHaveBeenCalledTimes(1);
        expect(updateSpy).toHaveBeenCalledTimes(2);
    });

    it('calls textMaskTransformer.update() when an input event is received when props.onChange() is not set', () => {
        const {wrapper, input} = setup();
        const wrapperInstance = wrapper.instance();
        const maskedInput = wrapperInstance._ref;
        const inputElement = input.getDOMNode();

        const updateSpy = jest.spyOn(maskedInput.textMaskTransformer, 'update');
        wrapperInstance._onChange = undefined;
        input.simulate('change', {target: {value: '123'}});

        expect(inputElement.value).toBe('(123) ___-____');
        expect(wrapperInstance._onChange).not.toBeDefined();
        expect(updateSpy).toHaveBeenCalledTimes(2);
    });

    it('calls textMaskTransformer.update() via onChange()', () => {
        const {wrapper, input} = setup({value: '123'});
        const maskedInput = wrapper.instance()._ref;
        const inputElement = input.getDOMNode();

        const updateSpy = jest.spyOn(maskedInput.textMaskTransformer, 'update');

        expect(inputElement.value).toBe('(123) ___-____');
        expect(updateSpy).toHaveBeenCalledTimes(0);

        maskedInput._onChange({target: {value: '12345'}});

        expect(inputElement.value).toBe('(123) 45_-____');
        expect(updateSpy).toHaveBeenCalledTimes(2);
    });
});
