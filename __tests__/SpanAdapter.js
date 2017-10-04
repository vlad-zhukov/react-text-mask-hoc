import React from 'react';
import {render} from '../__test-helpers__/reactHelpers';
import {withTextMask, SpanAdapter} from '../src/index';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

describe('SpanAdapter', () => {
    it('does not throw when instantiated', () => {
        expect(() => withTextMask(SpanAdapter)).not.toThrow();
    });

    it('does not throw when mounts to DOM', () => {
        const MaskedSpan = withTextMask(SpanAdapter);

        expect(() => render(<MaskedSpan mask={PHONE_MASK} />)).not.toThrow();
    });
});
