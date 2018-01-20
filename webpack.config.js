const path = require('path');

module.exports = function(env, argv){
  return {
    context: __dirname, // project root directory

    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      pathinfo: env.production ? false : true,
    },

    module: {
      rules: [
        {
          resource: {
            test: /\.jsx?$/,
            include: [ path.resolve(__dirname, "src/app") ],
          },
          use: [
            {
              loader: "babel-loader",
              options: { presets: ["es2015"] },
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

    devServer: {
      // ...
    },

    devtool: env.production ? "source-map" : "eval-source-map", // enum

    devServer: {
      contentBase: path.resolve(__dirname, "dist"),
      port: 9000,
      historyApiFallback: true,
      host: "0.0.0.0",
      open: true
    },

    target: "web",

    performance: {
      hints: env.production ?  "error" : "warning", // enum
    },

    stats: "normal",
  }
}
