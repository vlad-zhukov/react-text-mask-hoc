/* eslint-disable import/no-extraneous-dependencies */

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const {list: babelHelpersList} = require('babel-helpers');
const pkg = require('./package.json');

const externalHelpersWhitelist = babelHelpersList.filter(helperName => helperName !== 'asyncGenerator');
const plugins = [babel({externalHelpersWhitelist}), resolve(), commonjs()];
const external = ['react', 'react-native'].concat(Object.keys(pkg.dependencies));

rollup
    .rollup({
        input: './src/index.js',
        plugins,
        external,
    })
    .then(bundle => {
        bundle.write({
            file: pkg.main,
            format: 'cjs',
            sourcemap: true,
        });
        bundle.write({
            file: pkg.module,
            format: 'es',
            sourcemap: true,
        });
    })
    .catch(e => {
        console.log(e);
    });

rollup
    .rollup({
        input: './src/index.ReactNative.js',
        plugins,
        external,
    })
    .then(bundle => {
        bundle.write({
            file: './dist/react-text-mask-hoc.ReactNative.js',
            format: 'es',
            sourcemap: true,
        });
    })
    .catch(e => {
        console.log(e);
    });
