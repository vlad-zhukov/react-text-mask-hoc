const {createMaskedComponent, InputAdapter, SpanAdapter} = require('../dist/react-text-mask-hoc.cjs');

describe('import-bundle-cjs', () => {
    it('should export functions', () => {
        expect(typeof createMaskedComponent).toBe('function');
        expect(typeof InputAdapter).toBe('function');
        expect(typeof SpanAdapter).toBe('function');
    });
});
