/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */

import React, {PureComponent} from 'react';
import {Text, TextInput} from 'react-native';
import PropTypes from 'prop-types';

export class TextInputAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    _lastOnChangeEvent;
    _selection;
    _wait = false;

    get caretPosition() {
        return this._selection ? this._selection.end : 0;
    }

    _getRef = (ref) => {
        this.input = ref;
    };

    _onChange = ({nativeEvent}) => {
        this._lastOnChangeEvent = nativeEvent;
    };

    _onSelectionChange = ({nativeEvent}) => {
        // Throttle events because they are called multiple times for an unknown reason.
        if (this._wait) return;
        this._wait = true;
        setTimeout(() => {
            this._wait = false;
        }, 100);

        // onChange() runs before onSelectionChange(), so when text-mask gets selection
        // it's a previous value instead of the current one.

        this._selection = nativeEvent.selection;
        if (this._lastOnChangeEvent && this._lastOnChangeEvent.text !== this.props.value) {
            this.props.onChange(this._lastOnChangeEvent);
            this._lastOnChangeEvent = null;
        }
        else {
            this.forceUpdate();
        }
    };

    render() {
        const {caretPosition, onChange, ...rest} = this.props;

        return (
            <TextInput
                {...rest}
                ref={this._getRef}
                selection={{start: caretPosition, end: caretPosition}}
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
