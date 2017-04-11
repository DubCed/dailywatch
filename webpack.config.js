var autoprefixer = require('autoprefixer')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var OfflinePlugin = require('offline-plugin')
var Path = require('path')
var shared = require('./webpack.config.shared')
var webpack = require('webpack')

var outputFolder = Path.resolve(__dirname, 'dist')

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      // 'webpack-hot-middleware/client',
      Path.resolve(__dirname, 'src/index.js')
    ]
  },
  output: {
    path: outputFolder,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader', options: shared.getAdjustedBabelOptions() }
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: { loader: 'url-loader', options: { limit: 10000 } }
      }
    ]
  },
  devtool: '#inline-source-map'
}
