const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const styleLoaders = [
  { loader: 'style-loader', options: { sourceMap: true, hmr: !production } },
  { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

module.exports = (env, argv) => ({
  context: __dirname, // project root directory

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    pathinfo: production ? false : true,
  },

  module: {
    rules: [
      {
        resource: {
          test: /\.jsx?$/,
          include: [ path.resolve(__dirname, "src/") ],
        },
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            }
          }
        ],
      },
      {
        resource: {
          test: /\.[sp]?css$/,
          include: [ path.resolve(__dirname, "src/styles/") ],
        },
        use: production ? ExtractTextWebpackPlugin.extract({
          fallback: styleLoaders[0],
          use: styleLoaders.slice(1),
        }) : styleLoaders,
      },
    ],
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, "src"),
    ],
    enforceExtension: true,
    alias: {},
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextWebpackPlugin("styles.css"),
  ],

  devtool: production ? "source-map" : "eval-source-map", // enum

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    port: 9000,
    historyApiFallback: true,
    host: "0.0.0.0",
    open: true
  },

  target: "web",

  performance: {
    hints: production ?  "error" : "warning", // enum
  },

  stats: "normal",
});
