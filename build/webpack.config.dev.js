'use strict'
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(ts(x?)|js(x?))$/,
        exclude: /node_modules/,
        use: [
            'babel-loader',
            'ts-loader'
        ]
      },
      {
        test: /\.(css|scss|sass)$/,
        loaders: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({browsers: ['> 1%', 'ie >= 9', 'iOS >= 6', 'Android >= 2.1']})
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: 'url-loader?limit=8192'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  devServer: {
    port: 8088,
    host: '127.0.0.1',
    https: false,
    compress: true,
    disableHostCheck: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ]
}