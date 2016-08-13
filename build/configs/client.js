var webpack = require('webpack');
var config = require('./default');

var clientConfig = Object.assign({}, config(), {
    entry: {
        index: [
            __dirname + '/../../src/index.js'
        ]
    },
    output: {
        path: __dirname + '/../../dist/client/assets',
        filename: 'bundle.js',
        publicPath: '/assets/'
    }
});

if (clientConfig.debug) {
    clientConfig.entry.index.push('webpack-dev-server/client?http://localhost:8080/');
}

module.exports = clientConfig;