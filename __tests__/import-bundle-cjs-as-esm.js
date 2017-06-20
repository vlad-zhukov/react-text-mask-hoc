import * as reactBundle from '../dist/react-text-mask-hoc.cjs';

describe('import-bundle-cjs-as-esm', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.createMaskedComponent).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
    });
});
