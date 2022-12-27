const path = require('path');
webpack = require('webpack');

module.exports = {
    module:"production",
    entry: [
    "babel-polyfill",
    path.resolve(__dirname, "frontendend/src/index.js"),
  ],

  output: {
    // options related to how webpack emits results

    // where compiled files go
    path: path.resolve(__dirname, "frontendend/static/frontend/public/"),

    // 127.0.0.1/static/frontend/public/ where files are served from
    publicPath: "/static/frontend/public/",
    filename: "main.js", // the same one we import in index.html
  },
  module: {
    // configuration regarding modules
    rules: [
      {
        // regex test for js and jsx files
        test: /\.js$/,
        // don't look in the node_modules/ folder
        exclude: /node_modules/,
        // for matching files, use the babel-loader
        use: "raw-loader",
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/env"] },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  // JQuery読み込み
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};