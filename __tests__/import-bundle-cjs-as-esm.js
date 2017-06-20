import * as reactBundle from '../dist/react-text-mask-hoc.cjs';
import * as reactNativeBundle from '../ReactNative';

describe('import-bundle-cjs-as-esm', () => {
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
