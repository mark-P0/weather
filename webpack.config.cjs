const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',

  entry: './src/view/App.js',
  output: {
    filename: 'script.js',
    clean: true,
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src/'),
    },
  },
  experiments: {
    topLevelAwait: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: '☁',
      template: './src/view/index.ejs',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
