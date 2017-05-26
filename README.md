react-text-mask-hoc · [![npm](https://img.shields.io/npm/v/react-text-mask-hoc.svg)](https://www.npmjs.com/package/react-text-mask-hoc)
===================
> A higher order [text-mask](https://github.com/text-mask/text-mask) component for React and React Native.

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [`createMaskedComponent`](#createMaskedComponent)

## Install
```sh
$ yarn add react-text-mask-hoc
```
or
```sh
$ npm install --save react-text-mask-hoc
```

## Usage
__in React__
```js
import React, {PureComponent} from 'react';
import createMaskedComponent from 'react-text-mask-hoc';
import {InputAdapter} from 'react-text-mask-hoc/React';

const MaskedInput = createMaskedComponent(InputAdapter);

export default class Example extends PureComponent {
    state = {
        value: '5554953947',
    };

    _onChange(event) {

    }

    render() {
        return (
            <MaskedInput
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                guide={false}
                value={this.state.value}
                onChange={::this.onChange}
            />
        );
    }
}
```

## API

### `createMaskedComponent(WrappedComponent)`

__Arguments__
- `WrappedComponent` _(ReactElement)_

---
