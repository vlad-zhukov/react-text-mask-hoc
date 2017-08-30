/* eslint-disable import/no-extraneous-dependencies */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const isAndroid = navigator != null && /Android/i.test(navigator.userAgent);

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
        if (this.input === document.activeElement) {
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

    render() {
        const {caretPosition, ...rest} = this.props;

        return <input ref={this._getRef} type="text" {...rest} />;
    }
}
