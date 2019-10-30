// module.exports = (env, argv) => require(`./webpack.${argv.mode}.config.js`);

//Modulo de directorios
const path = require('path');

//HTML
const htmlWebpackPlugin = require('html-webpack-plugin');
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
  devServer: {
    port: 3000,
    public: 'https://3000-dc566581-ce1b-41b3-8bb7-de4798891421.ws-us1.gitpod.io',
    headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS", "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization" },
    disableHostCheck: true
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
          'style-loader',
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
    })
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({}),
      new TerserPlugin({})
    ]
  }
};