process.env.NODE_ENV = 'production';

const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

export default {
    entry: `./src/${pkg.name}.js`,

    plugins: [babel()],

    external: ['react', 'react-native', 'prop-types', 'text-mask-core'],

    targets: [
        {
            dest: pkg.main,
            format: 'cjs',
            sourceMap: true,
        },
        {
            dest: pkg.module,
            format: 'es',
            sourceMap: true,
        },
    ],
};
