import 'raf/polyfill';
import Enzyme from 'enzyme';
import React16Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new React16Adapter()});

// eslint-disable-next-line import/prefer-default-export
export function render(node) {
    return Enzyme.mount(node);
}
