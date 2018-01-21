
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const styleLoaders = [
  { loader: 'style-loader', options: { sourceMap: true } },
  { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

module.exports = {
  resource: {
    test: /\.[sp]?css$/,
    include: [path.resolve(__dirname, '../../src/styles/')],
  },
  use: ExtractTextWebpackPlugin.extract({
    fallback: styleLoaders[0],
    use: styleLoaders.slice(1),
  }),
}
