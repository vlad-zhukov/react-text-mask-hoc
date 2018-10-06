const env = process.env.NODE_ENV;

const presets = ['react', 'stage-2'];
const plugins = [];

if (env === 'test') {
    presets.unshift([
        'env',
        {
            targets: {node: 'current'},
        },
    ]);
}

if (env === 'production') {
    presets.unshift([
        'env',
        {
            targets: {node: 6, browsers: ['> 1%']},
            modules: false,
        },
    ]);

    plugins.push('external-helpers');
}

module.exports = {presets, plugins};
