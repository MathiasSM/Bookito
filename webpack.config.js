// Utils
const webpack = require('webpack');
const path = require('path');

// Webpack Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

// Separated Information
const packageJson = require('./package.json');
const htmlMinifierConfig = require('./.webpack/htmlMinifier.config.js');
const rules = require('./.webpack/rules');

const production = process.env.NODE_ENV === 'production';

module.exports = () => ({
  // project root directory
  context: path.resolve(__dirname, 'src'),

  // Entry point(s)
  entry: 'index.js',

  // Output settings
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    pathinfo: !production,
  },

  // Webpack files-as-modules processing rules
  module: { rules },

  // Module resolve settings
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src'),
    ],
    alias: {},
  },

  // Plugins settings
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development', DEBUG: false }),
    new CleanWebpackPlugin(['dist/*']),
    new ExtractTextWebpackPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: packageJson.description,
      minify: production && htmlMinifierConfig,
      showErrors: !production,
    }),
  ],

  // Source maps
  devtool: production ? 'source-map' : 'eval-source-map', // enum

  // Development server
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000,
    historyApiFallback: true,
    host: '0.0.0.0',
    open: true,
  },

  // Being explicit, because.
  target: 'web',

  // Logs
  performance: {
    hints: production ? 'error' : 'warning', // enum
  },
  stats: 'normal',
});
