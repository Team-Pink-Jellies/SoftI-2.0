const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // The entry point for our module bundler is index.js
  entry: ['./client/index.js'],
  // The output of our module bundler should be placed in a directory called build & the file should be named bundle.js
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
  },
  // Include source-map to allow for more accurate error tracking (reference our source-code instead of bundled source-code)
  devtool: 'source-map',
  module: {
    rules: [
      // Load .js/.jsx files via. Babel
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Load css files via. css-loader & style-loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Load logo-image via. file-loader
      {
        // File loader
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: ['file-loader'],
      },
    ],
  },
  // Creates a devServer allowing for live-reload upon editing client directories/files
  // Research if serving static file is required in devServer property of webpack configuration; if using liveReload replaces the need for this
  devServer: {
    port: 8080,
    hot: true,
    proxy: {
      '/paths': {
        target: 'http://localhost:8080',
        router: () => 'http://localhost:3000',
        logLevel: 'debug',
      },
    },
  },
  // Serve index.html via HtmlWebpackPlugin imported above
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  // Resolve all imports with no extension with .js or .jsx
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
