/* eslint-disable import/no-extraneous-dependencies */

import {TextInput, findNodeHandle} from 'react-native';

const components = {};

global.document = {
    get activeElement() {
        const tag = TextInput.State.currentlyFocusedField();
        if (components[tag]) return components[tag];
        return null;
    },
    addComponent(component) {
        const tag = findNodeHandle(component);
        components[tag] = component;
    },
    removeComponent(component) {
        const tag = findNodeHandle(component);
        delete components[tag];
    },
};

export {default as createMaskedComponent} from './createMaskedComponent';
export {TextInputAdapter, TextAdapter} from './ReactNativeAdapters';
