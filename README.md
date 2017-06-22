# react-text-mask-hoc · [![npm](https://img.shields.io/npm/v/react-text-mask-hoc.svg)](https://npm.im/react-text-mask-hoc)

> A higher-order [text-mask](https://github.com/text-mask/text-mask) component for [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
  - [`createMaskedComponent`](#createmaskedcomponentwrappedcomponent)
  - [Adapters](#adapters)
    - for React: [`InputAdapter`](#inputadapter) and [`SpanAdapter`](#spanadapter)
    - for React Native: [`TextInputAdapter`](#textinputadapter) and [`TextAdapter`](#textadapter)

## Install

```bash
yarn add react-text-mask-hoc
  # or
npm install --save react-text-mask-hoc
```

## Usage

```jsx
import React, {PureComponent} from 'react';
import {createMaskedComponent, InputAdapter} from 'react-text-mask-hoc';

// You can provide your own adapter component or use one of included in the library.
const MaskedInput = createMaskedComponent(InputAdapter);

export default class Example extends PureComponent {
    render() {
        return (
            <MaskedInput
                mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                guide={false}
                value="5554953947"
            />
        );
    }
}
```

For React Native import another file:
```jsx
import {createMaskedComponent, TextInputAdapter} from 'react-text-mask-hoc/ReactNative';

const MaskedInput = createMaskedComponent(TextInputAdapter);
```

## Examples

- [React](https://github.com/Vlad-Zhukov/react-text-mask-hoc/tree/master/examples/reactapp/)
- [React Native](https://github.com/Vlad-Zhukov/react-text-mask-hoc/tree/master/examples/reactnativeapp/)

## API

### `createMaskedComponent(AdaptedComponent)`

A [HOC](https://facebook.github.io/react/docs/higher-order-components.html) granting `text-mask` functionality to the wrapped component.

It's a controlled component and it maintains its own state, however it can also be controlled with props.

__Arguments__

- `AdaptedComponent` _(React.Component)_: A React component that follows the [adapter](#adapters) specification.

---

### Adapters

Adapters are React components that implement a special interface for the [`createMaskedComponent`](#createmaskedcomponentwrappedcomponent).

List of adapters included in this library:

- for React
  - `InputAdapter`
  - `SpanAdapter`
- for React Native
  - `TextInputAdapter`
  - `TextAdapter`

---
