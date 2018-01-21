const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


module.exports = function(env, argv){
  const plugins = [];
  if (env.prod) {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
  };

  const styleLoaders = [
    { loader: 'style-loader', options: { sourceMap: true, hmr: env.dev } },
    { loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 } },
    { loader: 'postcss-loader', options: { sourceMap: true } },
  ];


  return {
    context: __dirname, // project root directory

    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      pathinfo: env.prod ? false : true,
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
          use: env.prod ? ExtractTextWebpackPlugin.extract({
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

    plugins: env.prod ? plugins.concat([
      new ExtractTextWebpackPlugin("styles.css"),
    ]) : plugins.concat([]),

    devtool: env.prod ? "source-map" : "eval-source-map", // enum

    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      port: 9000,
      historyApiFallback: true,
      host: "0.0.0.0",
      open: true
    },

    target: "web",

    performance: {
      hints: env.prod ?  "error" : "warning", // enum
    },

    stats: "normal",
  }
}
