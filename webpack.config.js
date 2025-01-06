<<<<<<< HEAD
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'production',
=======
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
>>>>>>> 907398e81dd268bcbdd2f950265d3aaf770e22a8
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
<<<<<<< HEAD
    open: true,
    port: 8080,
    hot: true,
    client: {
      overlay: false
    }
=======
    port: 8080,
    hot: true,
>>>>>>> 907398e81dd268bcbdd2f950265d3aaf770e22a8
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') })],
  module: {
<<<<<<< HEAD
	rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
    ],
  },
 };
=======
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer'),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
>>>>>>> 907398e81dd268bcbdd2f950265d3aaf770e22a8
