/* eslint-disable */
import React, {PureComponent} from 'react';
import {Text, TextInput, findNodeHandle} from 'react-native';
import TextInputState from 'react-native/lib/TextInputState';
import PropTypes from 'prop-types';
/* eslint-enable */

const components = {};

global.document = {
    get activeElement() {
        const tag = TextInputState.currentlyFocusedField();
        if (components[tag]) return components[tag];
        return null;
    },
    addComponent(component) {
        const tag = findNodeHandle(component);
        components[tag] = component;
    },
    removeComponent(component) {
        const tag = findNodeHandle(component);
        delete components[tag];
    },
};

export class TextInputAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        componentRef: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        onSelectionChange: PropTypes.func,
    };

    _lastOnChangeEvent;
    _selection;
    _wait = false;

    state = {
        value: this.props.value,
    };

    get value() {
        return this.state.value;
    }

    set value(value) {
        this.setState({value});
    }

    get selectionStart() {
        return this._selection ? this._selection.start : 0;
    }

    get selectionEnd() {
        return this._selection ? this._selection.end : 0;
    }

    setSelectionRange(start, end) {
        this._selection = {start, end};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    _getRef(ref) {
        this.input = ref;
    }

    _onChange({nativeEvent}) {
        this._lastOnChangeEvent = nativeEvent;
    }

    _onSelectionChange({nativeEvent}) {
        // Throttle events because they are called multiple times for an unknown reason.
        if (this._wait) return;
        this._wait = true;
        setTimeout(() => { this._wait = false; }, 100);

        // onChange() is called before onSelectionChange(), so when text-mask gets selection
        // it's a previous value instead of the current one.

        this._selection = nativeEvent.selection;
        if (this.props.onSelectionChange) this.props.onSelectionChange(nativeEvent);

        if (this._lastOnChangeEvent && this._lastOnChangeEvent.text !== this.state.value) {
            this.props.onChange(this._lastOnChangeEvent);
            this._lastOnChangeEvent = null;
        }
        else {
            this.forceUpdate();
        }
    }

    render() {
        const {value, componentRef, onChange, ...rest} = this.props;
        componentRef(this);

        return (
            <TextInput
                ref={::this._getRef}
                value={this.state.value}
                selection={this._selection}
                onChange={::this._onChange}
                onSelectionChange={::this._onSelectionChange}
                {...rest}
            />
        );
    }
}

export class TextAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.string.isRequired,
        componentRef: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.value,
    };

    get value() {
        return this.state.value;
    }

    set value(value) {
        this.setState({value});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    render() {
        const {value, componentRef, onChange, ...rest} = this.props;
        componentRef(this);

        return <Text {...rest}>{this.state.value}</Text>;
    }
}
