import React, {PureComponent} from 'react';
import {createMaskedComponent, InputAdapter} from 'react-text-mask-hoc';

const MaskedInput = createMaskedComponent(InputAdapter);

export default class App extends PureComponent {
    state = {
        value: '',
    };

    _onChange = (event) => {
        this.setState({value: event.target.value});
    };

    render() {
        return (
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-4 control-label">Phone Number</label>
                    <div className="col-sm-4">
                        <MaskedInput
                            mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            guide={false}
                            value={this.state.value}
                            onChange={this._onChange}
                            className="form-control"
                        />
                    </div>
                </div>
            </form>
        );
    }
}
