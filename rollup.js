/* eslint-disable import/no-extraneous-dependencies */

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

const plugins = [babel()];
const external = ['react', 'react-native', 'prop-types', 'text-mask-core'];

rollup
    .rollup({
        entry: './src/index.js',
        plugins,
        external,
    })
    .then((bundle) => {
        bundle.write({
            dest: pkg.main,
            format: 'cjs',
            sourceMap: true,
        });
        bundle.write({
            dest: pkg.module,
            format: 'es',
            sourceMap: true,
        });
    });

rollup
    .rollup({
        entry: './src/index.ReactNative.js',
        plugins,
        external,
    })
    .then((bundle) => {
        bundle.write({
            dest: './ReactNative.js',
            format: 'cjs',
            sourceMap: true,
        });
    });
