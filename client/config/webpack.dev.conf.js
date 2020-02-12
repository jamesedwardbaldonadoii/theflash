const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('./public'),
    publicPath: '/',
    filename: 'js/[name].js'
  },
  devtool: 'source-map',
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8080/',
  //       changeOrigin: true,
  //       secure: false,
  //     },
  //   },
  //   publicPath: '/',
  // },
  module: {
    rules: [
      // styles
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: (loader) => [
                require('autoprefixer')(),
              ]
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // javascripts
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },

      // htmls
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      path: path.resolve('./public'),
      publicPath: '/',
    }),
    new HtmlWebPackPlugin({
      template: "./public/index.html"
    })
  ],
};