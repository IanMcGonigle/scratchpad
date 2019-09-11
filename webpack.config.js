const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    stats: "errors-only",
    host: process.env.HOST, // default: localhost
    port: process.env.PORT, // default: 8080
    open: true, // open page in browser
    overlay: true, // error overlay
  },
  plugins: [
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      title: "Project Name",
    }),
    new CopyPlugin([
      { from: './src/assets', to: './assets' },
    ]),
    new WriteFilePlugin({
      // Write only files that have ".css" extension.
      test: /\.css$/,
      useHashIndex: true
    })
  ],
};