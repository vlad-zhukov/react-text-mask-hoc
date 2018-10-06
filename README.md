# react-text-mask-hoc · [![npm](https://img.shields.io/npm/v/react-text-mask-hoc.svg)](https://npm.im/react-text-mask-hoc)

> A higher-order [text-mask](https://github.com/text-mask/text-mask) component for
> [React](https://facebook.github.io/react/) and [React Native](https://facebook.github.io/react-native/).

`text-mask` is great. It's a feature-rich solution for creating input masks for various libraries and frameworks.
However the React implementation has some long-standing bugs and feature requests that bury the potential of the
library.

**Features:**

-   Supports all features from `text-mask`, see its
    [documentation](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md) for more information.
-   **Custom components:** you can mask any components through a simple [adapter](#adapters) interface!
-   **Platform agnostic:** works in all browsers, React Native and Node.js (useful for server-side rendering)!

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Examples](#examples)
-   [API](#api)
    -   [`TextMask`](#textmask)
    -   [Adapters](#adapters)
        -   for React: `InputAdapter` and `SpanAdapter`
        -   for React Native: `TextInputAdapter` and `TextAdapter`
    -   [`TextMaskTransformer`](#textmasktransformer)

## Install

```bash
yarn add react-text-mask-hoc
  # or
npm install --save react-text-mask-hoc
```

## Usage

```jsx
import {TextMask, InputAdapter} from 'react-text-mask-hoc';

export default () => (
    <TextMask
        // You can provide your own adapter component or use one of included in the library.
        Component={InputAdapter}
        mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
        guide={false}
        value="5554953947"
    />
);
```

To use in React Native import `react-text-mask-hoc/ReactNative` instead:

```jsx
import {TextMask, TextInputAdapter} from 'react-text-mask-hoc/ReactNative';
```

## Examples

-   [React](https://github.com/Vlad-Zhukov/react-text-mask-hoc/tree/master/examples/reactapp/)
-   [React Native](https://github.com/Vlad-Zhukov/react-text-mask-hoc/tree/master/examples/reactnativeapp/)

## API

### `TextMask`

A component that grants `text-mask` functionality to the passed component.

It's a controlled component by default, but it also maintains its own state, however it can also be switched to
uncontrolled.

**Props**

-   all [`text-mask` settings](https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md)
-   `Component` _(React.Component)_: A component that follows the [adapter](#adapters) specification.
-   `[value]` _(String|Number)_: A value that will be masked. Will be used as an initial value on mounting, and later
    can be used to control the component. If `isControlled` prop is set to `false`, the value will be ignored on
    rerenders. Defaults to `null`.
-   `[isControlled]` _(Boolean)_: A way to set the component behaviour to be controlled by a `value` prop or to ignore
    it (to be uncontrolled). Can also be used to switch it in runtime. Defaults to `true`.
-   `[onChange]` _(Function)_: A function that is called on input changes. Takes 2 arguments: the native `event` (varies
    from a platform) and the next state (has `value` and `caretPosition` properties).
-   `[componentRef]` _(Function)_: A function that is called with a reference to the `Component`.

**Instance methods**

-   the `value` getter
-   `focus()`
-   `blur()`

---

### Adapters

Adapters are React components that implement a special interface for the
[`withTextMask`](#withtextmaskadaptedcomponent).

List of adapters included in this library:

-   for React
    -   `InputAdapter`
    -   `SpanAdapter`
-   for React Native
    -   `TextInputAdapter`
    -   `TextAdapter`

**Specification**

An adapter must be a React component that takes `value`, `caretPosition` and `onChange` props, and exposes a
`caretPosition` getter that always returns a positive integer number.

---

### `TextMaskTransformer`

A class that calculates a value and a caret position. Based on the `createTextMaskInputElement()` from
[`text-mask-core`](https://github.com/text-mask/text-mask/tree/master/core).

Exported for testing purposes only.

---
