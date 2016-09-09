var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-eval-source-map', //便于调试
  entry: [
    'webpack-hot-middleware/client',
    './index.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: ['babel'],
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy'],
        },
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}
