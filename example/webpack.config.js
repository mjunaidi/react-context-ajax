var webpack = require('webpack');
module.exports = {
  entry: [
    './example/app.jsx'
  ],
  output: {
    filename: './example/app.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          compact: true
        }
      }
    ]
  },
  plugins: [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]
};
