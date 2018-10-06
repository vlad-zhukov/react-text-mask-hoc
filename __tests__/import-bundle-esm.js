import * as reactBundle from '../dist/react-text-mask-hoc.esm';

describe('import-bundle-esm', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.TextMask).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
        expect(typeof reactBundle.TextMaskTransformer).toBe('function');
    });
});
