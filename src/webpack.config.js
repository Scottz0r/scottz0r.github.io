var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//var styleLoader = require('style-loader');
//var cssLoader = require('css-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        app: './src/shell-main.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
        rules: [ 
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({ 
                    use: 'css-loader', 
                    fallback: 'style-loader' 
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'shell.ejs',
            filename: 'shell.html',
            inject: 'body'
        }),
        new ExtractTextPlugin('site.css')
    ]
}
