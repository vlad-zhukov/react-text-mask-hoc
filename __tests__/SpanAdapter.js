import React from 'react';
import {mount} from 'enzyme';
import {createTextMask, SpanAdapter} from '../src/index';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

describe('SpanAdapter', () => {
    it('does not throw when instantiated', () => {
        expect(() => createTextMask(SpanAdapter)).not.toThrow();
    });

    it('does not throw when mounts to DOM', () => {
        const MaskedSpan = createTextMask(SpanAdapter);

        expect(() => mount(<MaskedSpan mask={PHONE_MASK} />)).not.toThrow();
    });
});
