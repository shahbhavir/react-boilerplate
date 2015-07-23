var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleTracker = require('webpack-bundle-tracker');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var node_modules_dir = __dirname + '/node_modules';

function getEntrySources(sources) {
    if (process.env.NODE_ENV !== 'production') {
        sources.push('webpack-dev-server/client?http://localhost:8080');
        sources.push('webpack/hot/only-dev-server');
    }
    return sources;
}

function getPublicPath() {
    if (process.env.NODE_ENV !== 'production') {
        return 'http://localhost:8080/public/';
    }
    return __dirname + '/public';
}

function getStatesFile() {
    if (process.env.NODE_ENV !== 'production') {
        return 'webpack-stats.json';
    }
    return 'webpack-stats-prod.json';
}

module.exports = {
    entry: {
        'styles': getEntrySources(['./app/less/styles.less']),
        'app': getEntrySources(['./app/App.jsx']),
    },
    output: {
        filename: '[name].js',
        path: getPublicPath(),
        publicPath: "/public/",
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot-loader', 'babel-loader'], exclude: /node_modules/ },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') }
        ]
    },
    resolve: {
        modulesDirectories: ['jsx', 'node_modules'],
        extensions: ['', '.js', '.jsx', '.less'],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new CommonsChunkPlugin({name: "common.chunk", filename: "common.chunk.js"}),
        new ExtractTextPlugin("[name].css", { allChunks: true }),
        new BundleTracker({filename: getStatesFile()}),
    ],
    devtool: 'source-map'
};
