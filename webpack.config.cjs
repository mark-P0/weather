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

  plugins: [
    new HtmlWebpackPlugin({
      title: '☁',
    }),
    new MiniCssExtractPlugin(),
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
