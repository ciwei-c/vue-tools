const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/lib/',
    filename: 'dynamic-form.js',
    chunkFilename: '[id].js',
    libraryExport: 'default',
    library: 'dynamic-form',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.scss'],
    modules: ['node_modules'],
    alias: {
      "@dynamic-form": path.resolve("./src")
    }
  },
  module: {
    rules: [
      
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options:
        {
          presets:["@babel/preset-env"]
        },
        exclude: /(node_modules|lib)/
      },
      {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'fonts/[name]-[hash].[ext]'
        }
      },
      {
        test: /\.(png|ico|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000,
          name: 'images/[name]-[hash].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};