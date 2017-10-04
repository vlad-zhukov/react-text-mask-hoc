import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {propsEqual} from 'react-shallow-equal';
import TextMaskTransformer from './TextMaskTransformer';

export default class TextMask extends PureComponent {
    static propTypes = {
        Component: PropTypes.func, // eslint-disable-line react/require-default-props
        mask: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.func,
            PropTypes.bool,
            PropTypes.shape({
                mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
                pipe: PropTypes.func,
            }),
        ]).isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        isControlled: PropTypes.bool,
        guide: PropTypes.bool,
        pipe: PropTypes.func,
        placeholderChar: PropTypes.string,
        keepCharPositions: PropTypes.bool,
        showMask: PropTypes.bool,
        onChange: PropTypes.func,
        componentRef: PropTypes.func,
    };

    static defaultProps = {
        value: null,
        isControlled: true,
        guide: true,
        pipe: null,
        placeholderChar: '_',
        keepCharPositions: false,
        showMask: false,
        onChange: () => {},
        componentRef: () => {},
    };

    constructor(props, context) {
        super(props, context);

        this.component = null;
        this.textMaskTransformer = new TextMaskTransformer();

        const value = props.value != null ? props.value : '';
        const nextUpdate = this._update({...props, value});

        if (nextUpdate !== null) {
            this.state = {
                value: nextUpdate.value,
                caretPosition: nextUpdate.caretPosition,
            };
        }
        else {
            this.state = {
                value: '',
                caretPosition: 0,
            };
        }
    }

    componentWillReceiveProps(nextProps) {
        const ignore = [];

        if (nextProps.isControlled === false) {
            ignore.push('value');
        }

        if (!propsEqual(this.props, nextProps, {ignore})) {
            const value =
                nextProps.isControlled === true && nextProps.value != null ? nextProps.value : this.state.value;
            const nextUpdate = this._update({...nextProps, value});
            if (nextUpdate !== null) {
                this.setState(nextUpdate);
            }
        }
    }

    get value() {
        return this.state.value;
    }

    _update = props =>
        this.textMaskTransformer.update({
            value: props.value,
            caretPosition: this.component != null ? this.component.caretPosition : 0,
            mask: props.mask,
            guide: props.guide,
            pipe: props.pipe,
            placeholderChar: props.placeholderChar,
            keepCharPositions: props.keepCharPositions,
            showMask: props.showMask,
        });

    _getRef = (comp) => {
        if (comp) {
            this.props.componentRef(comp);
            this.component = comp;
        }
    };

    _onChange = (event) => {
        if (event) {
            const rawValue = typeof event.target === 'object' ? event.target.value : event.text;
            const nextUpdate = this._update({...this.props, value: rawValue});

            if (nextUpdate !== null) {
                this.setState(nextUpdate, () => {
                    this.props.onChange(event, nextUpdate);
                });
            }
            else {
                this.props.onChange(event, this.state);
                this.forceUpdate();
            }
        }
    };

    focus() {
        if (this.component.input) this.component.input.focus();
    }

    blur() {
        if (this.component.input) this.component.input.blur();
    }

    render() {
        const {
            Component,
            value,
            isControlled,
            mask,
            guide,
            pipe,
            placeholderChar,
            keepCharPositions,
            showMask,
            componentRef,
            onChange,
            ...rest
        } = this.props;

        return (
            <Component
                {...rest}
                value={this.state.value}
                caretPosition={this.state.caretPosition}
                onChange={this._onChange}
                ref={this._getRef}
            />
        );
    }
}
