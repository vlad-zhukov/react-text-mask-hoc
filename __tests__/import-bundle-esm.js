import createMaskedComponent from '../dist/react-text-mask-hoc.esm';

describe('import-bundle-cjs', () => {
    it('should be a function', () => {
        expect(typeof createMaskedComponent === 'function').toBeTruthy();
    });
});
