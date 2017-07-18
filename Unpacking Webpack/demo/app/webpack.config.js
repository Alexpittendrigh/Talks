var path = require('path')
var webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function (env) {
  console.log('env', env)

  const isRelease = !!env && env.release
  console.log('**** isRelease', isRelease);
  const isDebug = !isRelease

  var plugins = [new webpack.DefinePlugin({
    __apiURL__: isRelease ? "'http://localhost:81'" : "'http://localhost:8081'",
    __isDebug__: isDebug
  })]

  if (isDebug) {
    // Enable HMR
    plugins.push(new webpack.HotModuleReplacementPlugin())
  } else if (isRelease) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      comments: true,
      mangle: false,
      compress : {
        warnings: true
      }
    }))
  }
  return {
  // Start looking at this file, then follow dependencies downward.
  entry: './src/index.js',
  output: {
    // This is where is saves the file it outputs
    path: path.resolve(__dirname, 'dist'),
    // This is what the src tags in your html are prepended with
    publicPath: '/dist/',
    // This is what the bundle will be called
    filename: 'bundle.js'
  },
  resolve: {
    modules: ['node_modules']
  },
  devtool: isRelease ? false : "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loaders: ['test-loader', 'babel-loader'],
        exclude: /node_modules/
      }, {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8193
        },
        exclude: /node_modules/
		  }
    ]
  },
  plugins: plugins,
  resolveLoader: {
    alias: {
      'test-loader': path.join(__dirname, 'testLoader.js')
    }
  },
  devServer: {
    hot: true, // Tell the dev-server we're using HMR
    contentBase: __dirname,
    publicPath: '/dist/'
  }
  }
}
