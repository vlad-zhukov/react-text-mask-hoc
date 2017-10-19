import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const isAndroid = typeof navigator !== 'undefined' && navigator !== null && /android/i.test(navigator.userAgent);
const isDocument = typeof document !== 'undefined' && document !== null;

export default class InputAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this._setCaretPosition();
    }

    componentDidUpdate() {
        this._setCaretPosition();
    }

    get caretPosition() {
        return this.input.selectionEnd;
    }

    _setCaretPosition() {
        if (isDocument && this.input === document.activeElement) {
            if (isAndroid === true) {
                setTimeout(() => {
                    this.input.setSelectionRange(this.props.caretPosition, this.props.caretPosition, 'none');
                }, 0);
            }
            else {
                this.input.setSelectionRange(this.props.caretPosition, this.props.caretPosition, 'none');
            }
        }
    }

    _getRef = (ref) => {
        this.input = ref;
    };

    _onChange = (event) => {
        event.persist();
        this.props.onChange(event);
    };

    render() {
        const {caretPosition, onChange, ...rest} = this.props;

        return <input ref={this._getRef} type="text" onChange={this._onChange} {...rest} />;
    }
}
