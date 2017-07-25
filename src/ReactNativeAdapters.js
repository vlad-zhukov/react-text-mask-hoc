/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */

import React, {Component, PureComponent} from 'react';
import {Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import {propsEqual} from 'react-shallow-equal';

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
        return !propsEqual(this.props, nextProps, {
            ignore: ['value', 'caretPosition'],
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

        return (
            <Text {...rest}>
                {value}
            </Text>
        );
    }
}
