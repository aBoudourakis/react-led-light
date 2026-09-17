const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/LedLight.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'LedLight.js',
        library: {
            name: 'LedLight',
            type: 'umd',
            export: 'default'
        },
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        "@babel/preset-env",
                        "@babel/preset-react",
                        "@babel/preset-typescript"
                    ]
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.png$/,
                type: 'asset/inline'
            }
        ]
    },
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        }
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'LedLight.css' })
    ],
    mode: 'production'
};
