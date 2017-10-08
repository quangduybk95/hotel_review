var webpack = require('webpack');

const paths = {
  js: './app/assets/javascripts/',
  jsx: './app/jsx/',
}

module.exports = {
  entry: paths.jsx + 'loader.jsx',
  output: {
    path: paths.js,
    filename: 'react-app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel?cacheDirectory'],
    },
      {
        test: /\.css$/,
        loader:'style!css!'
      }
    ],
    },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      update: 'react-addons-update',
    })
  ]
}
