const webpack = require('webpack');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    imoto: ['./src/imoto.js']
  },
  output: {
    path: './dist',
    publicPath: '/dist/',
    library: 'Imoto',
    libraryTarget: 'umd',
    filename: isProduction ? '[name].min.js' : '[name].js'
  },
  babel: {
    presets: ['es2015']
  },
  module: {
    preLoaders: [
      {test: /\.js$/, exclude: '/node_modules', loader: 'eslint'}
    ],
    loaders: [
      {test: /\.js$/, exclude: '/node_modules', loader: 'babel'}
    ]
  }
};
if(isProduction) {
  module.exports.plugins = [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ];
}

if(process.env.NODE_ENV === 'watch') {
  const express = require('express');
  const app = express();
  app.use('/dist', express.static(__dirname + '/dist'));
  app.use('/', express.static(__dirname + '/ghpages'));
  console.log('server start at port 8888');
  app.listen(8888);
}
