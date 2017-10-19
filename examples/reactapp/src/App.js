/* eslint-disable jsx-a11y/label-has-for */

import React, {PureComponent} from 'react';
import {TextMask, InputAdapter, SpanAdapter} from 'react-text-mask-hoc';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

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

export default class App extends PureComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            phoneValue: '12345',
            dollarValue: '100',
        };

        this._onChangePhone = (event) => {
            this.setState({phoneValue: event.target.value});
        };

        this._onChangeDollars = (event) => {
            this.setState({dollarValue: event.target.value});
        };
    }

    render() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-4 control-label" htmlFor="1">
                        Phone Number
                    </label>
                    <div className="col-sm-3">
                        <TextMask
                            Component={InputAdapter}
                            value={this.state.phoneValue}
                            mask={phoneMask}
                            guide={false}
                            onChange={this._onChangePhone}
                            className="form-control"
                            id="1"
                        />
                    </div>
                    <div className="col-sm-3">
                        <TextMask
                            Component={SpanAdapter}
                            value={this.state.phoneValue}
                            mask={phoneMask}
                            guide
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-4 control-label" htmlFor="2">
                        US Dollar Amount
                    </label>
                    <div className="col-sm-3">
                        <TextMask
                            Component={InputAdapter}
                            value={this.state.dollarValue}
                            mask={dollarMask}
                            guide
                            onChange={this._onChangeDollars}
                            className="form-control"
                            id="2"
                        />
                    </div>
                    <div className="col-sm-3">
                        <TextMask
                            Component={SpanAdapter}
                            value={this.state.dollarValue}
                            mask={dollarMask}
                            guide
                            className="form-control"
                        />
                    </div>
                </div>
            </form>
        );
    }
}
