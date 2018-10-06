import React from 'react';

const isAndroid = typeof navigator !== 'undefined' && navigator !== null && /android/i.test(navigator.userAgent);
const isDocument = typeof document !== 'undefined' && document !== null;

export default class InputAdapter extends React.PureComponent {
    constructor(props) {
        super(props);
        this._getRef = this._getRef.bind(this);
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        this._setCaretPosition();
    }

    componentDidUpdate() {
        this._setCaretPosition();
    }

    get caretPosition() {
        return this.input.selectionEnd;
    }

    _getRef(ref) {
        this.input = ref;
    }

    _onChange(event) {
        event.persist();
        this.props.onChange(event);
    }

    _setCaretPosition() {
        if (isDocument && this.input === document.activeElement) {
            if (isAndroid === true) {
                setTimeout(() => {
                    this.input.setSelectionRange(this.props.caretPosition, this.props.caretPosition, 'none');
                }, 0);
            } else {
                this.input.setSelectionRange(this.props.caretPosition, this.props.caretPosition, 'none');
            }
        }
    }

    render() {
        const {caretPosition, onChange, ...rest} = this.props;

        return <input ref={this._getRef} type="text" onChange={this._onChange} {...rest} />;
    }
}
