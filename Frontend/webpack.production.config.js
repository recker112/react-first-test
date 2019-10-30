// module.exports = (env, argv) => require(`./webpack.${argv.mode}.config.js`);

//Modulo de directorios
const path = require('path');

//HTML
const htmlWebpackPlugin = require('html-webpack-plugin');
//Extract css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//Minify css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//Minify js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    index: './index.js'
  },
  output: {
    filename: './assets/js/[name].bundle.js',
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(sass|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: '[folder]/[name].[ext]',
          //Ruta de salida de archivo
          outputPath: 'assets/css/fonts/',
          //Ruta a publicar en el css
          publicPath: 'fonts/'
        }
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: 'img/[name].[ext]',
          outputPath: 'assets/',
          publicPath: '../'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '/assets/css/[name].css'
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({})
    ]
  }
};