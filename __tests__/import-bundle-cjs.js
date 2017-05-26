const createMaskedComponent = require('../dist/react-text-mask-hoc.cjs');

describe('import-bundle-cjs', () => {
    it('should be a function', () => {
        expect(typeof createMaskedComponent === 'function').toBeTruthy();
    });
});
