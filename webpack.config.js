const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html',
    inject: 'body'
})

module.exports = {
    context: path.join(__dirname, 'src_v2'),
    entry: './index.js',
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        HtmlWebpackPluginConfig
    ],

    devServer: {
        host: '0.0.0.0',
        contentBase: path.join(__dirname, 'src_v2'),
        compress: true,
        historyApiFallback: true,
        hot: true
    }
}