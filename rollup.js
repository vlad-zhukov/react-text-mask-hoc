/* eslint-disable import/no-extraneous-dependencies */

const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const pkg = require('./package.json');

const plugins = [resolve(), commonjs(), babel()];
const external = ['react', 'react-native', 'prop-types'];

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
            dest: './dist/react-text-mask-hoc.ReactNative.js',
            format: 'es',
            sourceMap: true,
        });
    });
