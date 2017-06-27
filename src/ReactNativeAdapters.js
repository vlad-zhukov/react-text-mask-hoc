/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */

import React, {Component, PureComponent} from 'react';
import {Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import styleEqual from 'style-equal';
import {type} from './helpers';

function elementEquals(a, b) {
    const typeOfA = type(a);

    if (typeOfA !== type(b)) return false;

    switch (typeOfA) {
        case 'array':
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++) {
                if (!elementEquals(a[i], b[i])) return false;
            }
            return true;
        case 'object':
            if (a.type !== b.type) return false;
            if (a.key !== b.key) return false;
            if (a.ref !== b.ref) return false;
            return shallowElementEquals(a.props, b.props); // eslint-disable-line no-use-before-define
        default:
            return a === b;
    }
}

function shallowElementEquals(a, b, options = {}) {
    if (!options.exclude) options.exclude = []; // eslint-disable-line no-param-reassign

    const aKeys = Object.keys(a);
    let aCount = 0;
    let bCount = 0;

    for (let key = 0, l = aKeys.length; key < l; key++) {
        if (options.exclude.indexOf(key) === -1) {
            if (key === 'style') {
                // NOTE: kind of risky, but i'm assuming that a `style` prop is a React Native style,
                // and using the `styleEqual` algorithm here.
                if (!styleEqual(a[key], b[key])) return false;
            }
            else if (key === 'children') {
                // will compare children later
            }
            else if (a[key] !== b[key]) return false;
            aCount += 1;
        }
    }

    const bKeys = Object.keys(b);

    for (let key = 0, l = bKeys.length; key < l; key++) {
        if (options.exclude.indexOf(key) === -1) {
            bCount += 1;
        }
    }

    if (aCount !== bCount) return false;

    // compare children last...
    return elementEquals(a.children, b.children);
}

export class TextInputAdapter extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this._setNativeProps(this.props.value, this.props.caretPosition);
    }

    componentWillReceiveProps(nextProps) {
        this._setNativeProps(nextProps.value, nextProps.caretPosition);
    }

    shouldComponentUpdate(nextProps) {
        return !shallowElementEquals(this.props, nextProps, {
            exclude: ['value', 'caretPosition'],
        });
    }

    _selection;
    _lastOnChangeEvent;

    get caretPosition() {
        return this._selection || 0;
    }

    _setNativeProps(value, caretPosition) {
        this.input.setNativeProps({text: value});
        this.input.setNativeProps({selection: {start: caretPosition, end: caretPosition}});
    }

    _getRef = (ref) => {
        this.input = ref;
    };

    _onChange = ({nativeEvent}) => {
        this._lastOnChangeEvent = nativeEvent;
    };

    // onChange() runs before onSelectionChange(), so when text-mask gets selection
    // it's a previous value instead of the current one.
    _onSelectionChange = (event) => {
        this._selection = event.nativeEvent.selection.end;

        if (this._lastOnChangeEvent) {
            this.props.onChange(this._lastOnChangeEvent);
            this._lastOnChangeEvent = undefined;
        }
    };

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return (
            <TextInput
                {...rest}
                ref={this._getRef}
                onChange={this._onChange}
                onSelectionChange={this._onSelectionChange}
            />
        );
    }
}

export class TextAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    // eslint-disable-next-line class-methods-use-this
    get caretPosition() {
        return 0;
    }

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return <Text {...rest}>{value}</Text>;
    }
}
