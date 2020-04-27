const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');

const commonConfig = {
  entry: path.resolve(__dirname + '/src/vue-json2excel.vue'),
  output: {
    path: path.resolve(__dirname + '/dist/'),
    filename: 'vue-json2excel.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [

  // Config 1: For browser environment
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/plugin.js'),
    output: {
      filename: 'vue-json2excel.min.js'
    }
  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/vue-json2excel.vue'),
    output: {
      filename: 'vue-json2excel.js',
      libraryTarget: 'umd',
      library: 'vue-json2excel',
      umdNamedDefine: true
    }
  })
];