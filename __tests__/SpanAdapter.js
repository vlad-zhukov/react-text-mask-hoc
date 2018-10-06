import React from 'react';
import {render} from '../__test-helpers__/reactHelpers';
import {TextMask, SpanAdapter} from '../dist/react-text-mask-hoc.cjs';

const PHONE_MASK = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

describe('SpanAdapter', () => {
    it('does not throw when mounts to DOM', () => {
        expect(() => render(<TextMask Component={SpanAdapter} mask={PHONE_MASK} />)).not.toThrow();
    });
});
