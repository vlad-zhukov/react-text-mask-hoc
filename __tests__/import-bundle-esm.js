import * as reactBundle from '../dist/react-text-mask-hoc.esm';

describe('import-bundle-esm', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.createMaskedComponent).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
    });
});
