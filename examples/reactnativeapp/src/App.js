/* eslint-disable no-use-before-define */

import React, {PureComponent} from 'react';
import {View, Text, StyleSheet} from 'react-native';
// haul dislikes rebuilds
import {createMaskedComponent, TextInputAdapter, TextAdapter} from 'react-text-mask-hoc/ReactNative';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const MaskedTextInput = createMaskedComponent(TextInputAdapter);
const MaskedText = createMaskedComponent(TextAdapter);

const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
const dollarMask = createNumberMask({
    prefix: '',
    suffix: ' $',
    thousandsSeparatorSymbol: ' ',
    integerLimit: 10,
    allowDecimal: true,
    decimalSymbol: ',',
    decimalLimit: 2,
});

export default class ReactNativeApp extends PureComponent {
    state = {
        phoneValue: '12345',
        dollarValue: '100',
    };

    _onChangePhone = (event) => {
        this.setState({phoneValue: event.text});
    };

    _onChangeDollars = (event) => {
        this.setState({dollarValue: event.text});
    };

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.FieldContainer}>
                    <View style={styles.Field}>
                        <Text style={styles.FieldTitle}>Phone Number</Text>
                        <MaskedTextInput
                            value={this.state.phoneValue}
                            mask={phoneMask}
                            guide={false}
                            onChange={this._onChangePhone}
                            style={styles.FieldInput}
                            maxLength={phoneMask.length} // removes a last character flickering
                        />
                    </View>
                    <View style={styles.Field}>
                        <MaskedText value={this.state.phoneValue} mask={phoneMask} guide style={styles.FieldInput} />
                    </View>
                </View>
                <View style={styles.FieldContainer}>
                    <View style={styles.Field}>
                        <Text style={styles.FieldTitle}>US Dollar Amount</Text>
                        <MaskedTextInput
                            value={this.state.dollarValue}
                            mask={dollarMask}
                            guide
                            onChange={this._onChangeDollars}
                            style={styles.FieldInput}
                        />
                    </View>
                    <View style={styles.Field}>
                        <MaskedText value={this.state.dollarValue} mask={dollarMask} guide style={styles.FieldInput} />
                    </View>
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
    FieldContainer: {
        marginVertical: 20,
        marginHorizontal: 30,
    },
    Field: {
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
