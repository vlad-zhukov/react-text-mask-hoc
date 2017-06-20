const reactBundle = require('../dist/react-text-mask-hoc.cjs');
const reactNativeBundle = require('../ReactNative');

describe('import-bundle-cjs', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.createMaskedComponent).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
    });

    test('React Native bundle should export functions', () => {
        expect(typeof reactNativeBundle.createMaskedComponent).toBe('function');
        expect(typeof reactNativeBundle.TextInputAdapter).toBe('function');
        expect(typeof reactNativeBundle.TextAdapter).toBe('function');
    });
});
