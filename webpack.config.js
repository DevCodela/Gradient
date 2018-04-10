var webpack = require('webpack')

module.exports = {
  entry: './src/client/app.js',
  output: {
    path: __dirname + '/public/js',
    filename: 'app.min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
