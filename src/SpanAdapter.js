import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

export default class SpanAdapter extends PureComponent {
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
