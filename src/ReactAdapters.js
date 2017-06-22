/* eslint-disable import/no-extraneous-dependencies, react/no-multi-comp */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export class InputAdapter extends PureComponent {
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

    _getRef = (ref) => {
        this.input = ref;
    };

    _setCaretPosition = () => {
        this.input.setSelectionRange(this.props.caretPosition, this.props.caretPosition, 'none');
    };

    render() {
        const {caretPosition, ...rest} = this.props;

        return <input ref={this._getRef} {...rest} />;
    }
}

export class SpanAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        caretPosition: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    // eslint-disable-next-line class-methods-use-this
    get caretPosition() {
        return 0;
    }

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return <span {...rest}>{value}</span>;
    }
}
