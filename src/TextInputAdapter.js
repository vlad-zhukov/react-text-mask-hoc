import React from 'react';
import {TextInput} from 'react-native'; // eslint-disable-line
import {propsEqual} from 'react-shallow-equal';

export default class TextInputAdapter extends React.Component {
    constructor(props) {
        super(props);
        this._lastOnChangeEvent = undefined;
        this._selection = undefined;
        this._onSelectionChange = this._onSelectionChange.bind(this);
        this._onChange = this._onChange.bind(this);
        this._getRef = this._getRef.bind(this);
    }

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

    get caretPosition() {
        return this._selection || 0;
    }

    // onChange() runs before onSelectionChange(), so when text-mask gets selection
    // it's a previous value instead of the current one.
    _onSelectionChange(event) {
        this._selection = event.nativeEvent.selection.end;

        if (this._lastOnChangeEvent) {
            this.props.onChange(this._lastOnChangeEvent);
            this._lastOnChangeEvent = undefined;
        }
    }

    _onChange({nativeEvent}) {
        this._lastOnChangeEvent = nativeEvent;
    }

    _getRef(ref) {
        this.input = ref;
    }

    _setNativeProps(value, caretPosition) {
        this.input.setNativeProps({text: value});
        this.input.setNativeProps({selection: {start: caretPosition, end: caretPosition}});
    }

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
