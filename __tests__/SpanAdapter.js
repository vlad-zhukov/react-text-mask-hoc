import React from 'react';
import {mount} from 'enzyme';
import {withTextMask, SpanAdapter} from '../src/index';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

describe('SpanAdapter', () => {
    it('does not throw when instantiated', () => {
        expect(() => withTextMask(SpanAdapter)).not.toThrow();
    });

    it('does not throw when mounts to DOM', () => {
        const MaskedSpan = withTextMask(SpanAdapter);

        expect(() => mount(<MaskedSpan mask={PHONE_MASK} />)).not.toThrow();
    });
});
