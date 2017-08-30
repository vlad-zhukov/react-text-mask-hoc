import * as reactBundle from '../dist/react-text-mask-hoc.esm';
import * as reactNativeBundle from '../ReactNative';

describe('import-bundle-esm', () => {
    test('React bundle should export functions', () => {
        expect(typeof reactBundle.TextMask).toBe('function');
        expect(typeof reactBundle.withTextMask).toBe('function');
        expect(typeof reactBundle.InputAdapter).toBe('function');
        expect(typeof reactBundle.SpanAdapter).toBe('function');
        expect(typeof reactBundle.TextMaskTransformer).toBe('function');
    });

    test('React Native bundle should export functions', () => {
        expect(typeof reactNativeBundle.TextMask).toBe('function');
        expect(typeof reactNativeBundle.withTextMask).toBe('function');
        expect(typeof reactNativeBundle.TextInputAdapter).toBe('function');
        expect(typeof reactNativeBundle.TextAdapter).toBe('function');
        expect(typeof reactNativeBundle.TextMaskTransformer).toBe('function');
    });
});
