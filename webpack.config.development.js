const path = require('path');

module.exports = {
    entry: './src/vastate.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'vastate.js',
        library: 'Vastate',
        libraryExport: 'default',
        libraryTarget: 'window',
        path: path.resolve(__dirname, 'dist'),
    },
};