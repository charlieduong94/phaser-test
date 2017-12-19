const path = require('path')

// plugins
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/game.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new CopyPlugin([
      // copy assets to dist
      { from: './assets', to: '.dist/assets' }
    ])
  ],
  devServer: {
    contentBase: './dist'
  }
}
