const { resolve } = require('path')

module.exports = {
  mode: 'production',
  target: 'node',
  entry: resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: resolve(__dirname, 'lib'),
    filename: 'index.js',
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
