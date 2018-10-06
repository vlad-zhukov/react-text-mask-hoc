import React from 'react';
import {Text} from 'react-native'; // eslint-disable-line

export default class TextAdapter extends React.PureComponent {
    // eslint-disable-next-line class-methods-use-this
    get caretPosition() {
        return 0;
    }

    render() {
        const {value, caretPosition, onChange, ...rest} = this.props;

        return <Text {...rest}>{value}</Text>;
    }
}
