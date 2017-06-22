/* eslint-disable import/no-extraneous-dependencies */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import TextMaskElement from './TextMaskElement';

export default WrappedComponent =>
    class TextMask extends PureComponent {
        static propTypes = {
            mask: PropTypes.oneOfType([
                PropTypes.array,
                PropTypes.func,
                PropTypes.bool,
                PropTypes.shape({
                    mask: PropTypes.oneOfType([PropTypes.array, PropTypes.func]),
                    pipe: PropTypes.func,
                }),
            ]).isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            guide: PropTypes.bool,
            pipe: PropTypes.func,
            placeholderChar: PropTypes.string,
            keepCharPositions: PropTypes.bool,
            showMask: PropTypes.bool,
            onChange: PropTypes.func,
            componentRef: PropTypes.func,
        };

        static defaultProps = {
            value: '',
            guide: true,
            pipe: null,
            placeholderChar: '_',
            keepCharPositions: false,
            showMask: false,
            onChange: () => {},
            componentRef: () => {},
        };

        constructor(props, context) {
            super(props, context);

            this.component = null;
            this.textMaskElement = null;

            this.textMaskElement = new TextMaskElement();
            const nextUpdate = this._update(this.props);

            if (nextUpdate !== null) {
                this.state = {
                    value: nextUpdate.value,
                    caretPosition: nextUpdate.caretPosition,
                };
            }
            else {
                this.state = {
                    value: '',
                    caretPosition: 0,
                };
            }
        }

        componentWillReceiveProps(nextProps) {
            const nextUpdate = this._update(nextProps);
            if (nextUpdate !== null) this.setState(nextUpdate);
        }

        _update = props =>
            this.textMaskElement.update({
                value: props.value,
                caretPosition: this.component != null ? this.component.caretPosition : 0,
                mask: props.mask,
                guide: props.guide,
                pipe: props.pipe,
                placeholderChar: props.placeholderChar,
                keepCharPositions: props.keepCharPositions,
                showMask: props.showMask,
            });

        _getRef = (comp) => {
            if (comp) {
                this.props.componentRef(comp);
                this.component = comp;
            }
        };

        _onChange = (event) => {
            if (event) {
                const rawValue = event.target != null && typeof event.target === 'object'
                    ? event.target.value
                    : event.text;
                const nextUpdate = this._update({...this.props, value: rawValue});
                if (nextUpdate !== null) {
                    this.setState(nextUpdate);
                }
                this.props.onChange(event);
            }
        };

        render() {
            const {
                value,
                mask,
                guide,
                pipe,
                placeholderChar,
                keepCharPositions,
                showMask,
                componentRef,
                onChange,
                ...rest
            } = this.props;

            return (
                <WrappedComponent
                    {...rest}
                    value={this.state.value}
                    caretPosition={this.state.caretPosition}
                    onChange={this._onChange}
                    ref={this._getRef}
                />
            );
        }

        // Callback input functions.

        // focus() {
        //     this.component.focus();
        // }
        //
        // blur() {
        //     this.component.blur();
        // }
    };
