const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', 
    publicPath: '/'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpeg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: { 
    historyApiFallback: true, 
  },
  plugins: [new HtmlWebpackPlugin({ template: 'public/index.html' })]
}
