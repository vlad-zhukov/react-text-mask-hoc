import React, {PureComponent} from 'react';
import {createMaskedComponent, InputAdapter, SpanAdapter} from 'react-text-mask-hoc';

const MaskedInput = createMaskedComponent(InputAdapter);
const MaskedSpan = createMaskedComponent(SpanAdapter);

export default class App extends PureComponent {
    state = {
        value: '12345',
    };

    _onChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        const phoneMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="1" className="col-sm-4 control-label">Phone Number</label>
                    <div className="col-sm-3">
                        <MaskedInput
                            mask={phoneMask}
                            guide={false}
                            value={this.state.value}
                            onChange={this._onChange}
                            className="form-control"
                            id="1"
                        />
                    </div>
                    <div className="col-sm-3">
                        <MaskedSpan mask={phoneMask} guide value={this.state.value} className="form-control" />
                    </div>
                </div>
            </form>
        );
    }
}
