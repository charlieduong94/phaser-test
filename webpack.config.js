const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/game.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new CopyPlugin([
      {
        from: './assets',
        // NOTE: the "to" endpoint is relative
        // to the output path
        to: './assets'
      }
    ])
  ],

  module: {
    rules: []
  },
  devServer: {
    contentBase: './dist'
  }
}
