import * as reactBundle from '../dist/react-text-mask-hoc.esm';
import * as reactNativeBundle from '../ReactNative';

describe('import-bundle-esm', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.createMaskedComponent).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
        expect(typeof reactBundle.TextMaskElement).toBe('function');
    });

    test('React Native bundle should export functions', () => {
        expect(typeof reactNativeBundle.createMaskedComponent).toBe('function');
        expect(typeof reactNativeBundle.TextInputAdapter).toBe('function');
        expect(typeof reactNativeBundle.TextAdapter).toBe('function');
        expect(typeof reactNativeBundle.TextMaskElement).toBe('function');
    });
});
