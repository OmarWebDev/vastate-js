const path = require('path');

module.exports = {
    entry: './src/vastate.ts',
    mode: "production",
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'vastate.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};