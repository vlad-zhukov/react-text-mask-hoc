/* eslint-disable */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
/* eslint-enable */

/* eslint-disable react/no-multi-comp */

export class InputAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        componentRef: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    static defaultProps = {
        value: '',
    };

    render() {
        const {componentRef, ...rest} = this.props;

        return <input ref={componentRef} {...rest} />;
    }
}

export class SpanAdapter extends PureComponent {
    static propTypes = {
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        componentRef: PropTypes.func.isRequired,
    };

    state = {
        value: this.props.value,
    };

    componentWillMount() {
        this.props.componentRef(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.state.value) {
            this.setState({value: nextProps.value});
        }
    }

    get value() {
        return this.state.value;
    }

    set value(value) {
        this.setState({value});
    }

    render() {
        const {value, componentRef, onChange, ...rest} = this.props;

        return <span {...rest}>{this.state.value}</span>;
    }
}
