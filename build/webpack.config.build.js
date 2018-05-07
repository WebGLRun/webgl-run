'use strict'
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CleanPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  entry: {
    'app': path.resolve(__dirname, '../src/index.tsx')
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.[hash:8].js',
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
        test: /\.less$/,
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
          'less-loader'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|svg)(\?t=\d+)?$/,
        loaders: [{
          loader: 'url-loader?limit=8192&name=assets/[name]-[hash].[ext]'
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  plugins: [
    new CleanPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new WebpackShellPlugin({
      onBuildExit: ['sh build/helper.sh']
    }),
    new webpack.IgnorePlugin(/^((fs)|(path)|(os)|(crypto)|(source-map-support))$/, /vs(\/|\\)language(\/|\\)typescript(\/|\\)lib/),
    new BundleAnalyzerPlugin()
  ],
  node: {
    fs: 'empty'
  },
}