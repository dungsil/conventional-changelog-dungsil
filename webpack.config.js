const { resolve } = require('path')

module.exports = {
  entry: resolve(__dirname, 'src', 'index.spec.ts'),
  output: {
    path: resolve(__dirname, 'lib'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
