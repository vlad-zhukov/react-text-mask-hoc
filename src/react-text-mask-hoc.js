/* eslint-disable */
import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {createTextMaskInputElement} from 'text-mask-core';
/* eslint-enable */

const isReactNative = window && !window.document;

// eslint-disable-next-line no-unused-vars
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
            guide: PropTypes.bool,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            pipe: PropTypes.func,
            placeholderChar: PropTypes.string,
            keepCharPositions: PropTypes.bool,
            showMask: PropTypes.bool,
            onChange: PropTypes.func,
            componentRef: PropTypes.func,
        };

        static defaultProps = {
            guide: true,
            value: '',
            pipe: null,
            placeholderChar: '_',
            keepCharPositions: false,
            showMask: false,
            onChange: () => {},
            componentRef: () => {},
        };

        textMaskInputElement;

        componentDidMount() {
            if (isReactNative) document.addComponent(this.component);
            this.initTextMask();
        }

        componentDidUpdate() {
            this.initTextMask();
        }

        componentWillUnmount() {
            if (isReactNative) document.removeComponent(this.component);
        }

        initTextMask() {
            const {value, ...rest} = this.props;
            this.textMaskInputElement = createTextMaskInputElement({inputElement: this.component, ...rest});
            this.textMaskInputElement.update(value);
        }

        _getRef = (comp) => {
            if (comp) {
                this.props.componentRef(comp);
                this.component = comp;
            }
        };

        _onChange = (event) => {
            if (event) {
                this.textMaskInputElement.update();
                this.props.onChange(event);
            }
        };

        render() {
            const {
                mask,
                guide,
                pipe,
                placeholderChar,
                keepCharPositions,
                onChange,
                showMask,
                componentRef,
                ...rest
            } = this.props;

            return <WrappedComponent {...rest} onChange={this._onChange} componentRef={this._getRef} />;
        }

        // Callback input functions.

        focus() {
            this.component.focus();
        }

        blur() {
            this.component.blur();
        }
    };
