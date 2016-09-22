var Webpack = require('webpack');

var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
var {ComponentsScanner, plugins} = require('malanka/es5/build');

var DEBUG = process.env.NODE_ENV !== 'production';

var className = DEBUG ? '[name]__[local]___[hash:base64:5]' : '[hash:base64:4]&minimize';

module.exports = () => {
    var extractTextWebpackPlugin = new ExtractTextWebpackPlugin('styles.css', {
        allChunks: true
    });

    var config = {
        info: true,
        debug: DEBUG,
        stats: {colors: true},
        styles: 'css?modules&importLoaders=1&localIdentName=' + className,

        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel?cacheDirectory',
                    exclude: /es5/
                },
                {
                    test: /\.hbs$/,
                    loader: 'malanka'
                },
                {
                    test: /\.css$/,
                    loader: extractTextWebpackPlugin.extract('css?modules&importLoaders=1&localIdentName=' + className)
                },
                {
                    test: /\.(svg|png)/,
                    loader: 'file'
                }
            ]
        },
        devtool: DEBUG ? 'inline-source-map' : false,

        plugins: [
            new ComponentsScanner({
                helpers: [
                    __dirname + '/../../src/helpers/*.js'
                ],
                components: [
                    __dirname + '/../../src/components/**/*.js'
                ],
                plugins: [
                    new plugins.TemplateTrimSpacesPlugin(),
                    new plugins.TemplateCSSModulesPlugin(),
                    new plugins.TemplateFlattenPlugin(),
                    new plugins.TemplateRequirePlugin()
                ]
            }),
            extractTextWebpackPlugin
        ]
    };

    if (!DEBUG) {
        config.plugins.push(new Webpack.optimize.OccurenceOrderPlugin());
        config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            semicolons: false,
            mangle: true,
            compress: {
                warnings: true
            }
        }));
        config.plugins.push(new Webpack.optimize.DedupePlugin());
    }
    
    return config;
};
