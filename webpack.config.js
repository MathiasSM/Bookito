const path = require('path');


module.exports = function(env, argv){
  const plugins = [];
  if (env.prod) {
    plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }));
  };

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
      // ...
    ],

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
