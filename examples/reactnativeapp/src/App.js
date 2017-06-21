/* eslint-disable no-use-before-define */

import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// haul doesn't like rebuilds
import {createMaskedComponent, TextInputAdapter} from 'react-text-mask-hoc/src/index.ReactNative';

const MaskedTextInput = createMaskedComponent(TextInputAdapter);

export default class ReactNativeApp extends PureComponent {
    state = {
        value: '',
    };

    _onChange = (event) => {
        this.setState({value: event.text});
    };

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.Field}>
                    <Text style={styles.FieldTitle}>Phone Number</Text>
                    <MaskedTextInput
                        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                        guide={false}
                        value={this.state.value}
                        onChange={this._onChange}
                        style={styles.FieldInput}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    Field: {
        marginHorizontal: 30,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#000',
    },
    FieldTitle: {
        margin: 5,
        fontSize: 15,
    },
    FieldInput: {
        margin: 5,
        height: 20,
        fontSize: 15,
        lineHeight: 20,
    },
});
