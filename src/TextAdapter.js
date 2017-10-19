import React, {PureComponent} from 'react';
import {Text} from 'react-native'; // eslint-disable-line
import PropTypes from 'prop-types';

export default class TextAdapter extends PureComponent {
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
