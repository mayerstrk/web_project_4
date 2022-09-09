// webpack.config.js
const path = require("path"); // connect path to webpack congig
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin 
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // connect plugin

// connect mini-css-extract-plugin to the project
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // module.exports is the syntax for export in Node.js
  devtool: "inline-source-map",
  entry: {
    main: "./src/pages/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    publicPath: "",
  },
  target: ["web", "es5"], // ensure the webpack glue code is ES5 compatible too
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true,
    port: 8080,
    open: true,
  },
  module: {
    rules: [
      // this is an array of rules
      // add an object containing rules for Babel to it
      {
        // a regular expression that searches for all js files
        test: /\.js$/,
        // all files must be processed by babel-loader
        loader: "babel-loader",
        // exclude the node_modules folder, we don't need to process files in it
        exclude: "/node_modules/",
      },
      {
        test: /\.css$/,
        // to process these files, use
        // MiniCssExtractPlugin.loader and css-loader
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            // add an options object
            options: { importLoaders: 1 },
          },
          // add postcss-loader
          "postcss-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // path to our index.html file
    }),
    new CleanWebpackPlugin(), // use plugin
    new MiniCssExtractPlugin(), // connect plugin for mergin CSS files
  ],
};
