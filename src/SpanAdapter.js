import React from 'react';

export default class SpanAdapter extends React.PureComponent {
    // eslint-disable-next-line class-methods-use-this
    get caretPosition() {
        return 0;
    }

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return <span {...rest}>{value}</span>;
    }
}
