const env = process.env.NODE_ENV;

const presets = ['@babel/preset-react'];
const plugins = [];

if (env === 'test') {
    plugins.push(
        ['@babel/plugin-transform-modules-commonjs'],
        ['@babel/plugin-proposal-object-rest-spread', {loose: true}]
    );
}

if (env === 'production') {
    plugins.push(['@babel/plugin-proposal-object-rest-spread', {loose: true}]);
}

module.exports = {presets, plugins};
