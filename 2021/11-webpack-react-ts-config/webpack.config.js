const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
  entry: {
    'app': './src/app.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'ReactByWebpack',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [
      { test: /\.(jsx?|tsx?)$/, exclude: /node_modules/, use: ['happypack/loader'] },
      { test: /\.less$/, exclude: /node_modules/, use: ['style-loader', 'css-loader', 'less-loader']}
    ]
  },
 plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new HappyPack({
      loaders: ['babel-loader']
    })
  ],
  devServer: {
    contentBase: './dist',
    port: 8888,
    compress: true
  }
}