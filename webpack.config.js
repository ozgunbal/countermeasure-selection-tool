const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    context: path.join(__dirname, 'src_v3'),
    entry: './index.js',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig,
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],

    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'src_v2'),
        compress: true,
        historyApiFallback: true,
        hot: true
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false,
                beautify: false,
            }
        })
    )
}
