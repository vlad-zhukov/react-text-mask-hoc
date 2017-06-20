import {createMaskedComponent, InputAdapter, SpanAdapter} from '../dist/react-text-mask-hoc.esm';

describe('import-bundle-cjs', () => {
    it('should export functions', () => {
        expect(typeof createMaskedComponent).toBe('function');
        expect(typeof InputAdapter).toBe('function');
        expect(typeof SpanAdapter).toBe('function');
    });
});
