const path = require('path')
const Dotenv = require('dotenv-webpack');


module.exports = {
  mode: 'development',
  entry: './src/js/index.js',  // this is the file we want to compile
  // TODO: explain importance of sourcemap
  // devtool: 'inline-cheap-source-map',
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', {
                targets: {
                  esmodules: true
                }
              }],
              '@babel/preset-react',
            ]
          }
        }
      },
      {
        test: [/\.s[ac]ss$/i, /\.css$/i],
        use: [
          'style-loader',  // Create the style nodes from JS strings
          'css-loader',  // translate CSS to CommonJS
          'sass-loader',  // compile SASS to CSS
        ]
      },
      {
        test: /\.(jpg|jpeg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public')
  },
  plugins: [new Dotenv()],
  resolve: {
    extensions: ['.js'],
  },
  output: {
    filename: "App.js",
    path: path.resolve(__dirname, 'build', 'js'),
  },
}