const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    app: ['./src/app.jsx'],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'babel-polyfill',
      'react-router', 'react-router-dom', 'react-bootstrap',
      'react-router-bootstrap',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].bundle.js',
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
  },

  plugins: [

  ],

  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },


  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },

    historyApiFallback: true,
    hot: true,
  },

  devtool: 'source-map',
};
