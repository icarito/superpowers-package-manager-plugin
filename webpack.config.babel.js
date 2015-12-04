import path from 'path';
export default {
  entry: {
    api: path.join(__dirname, 'api'),
    componentEditors: path.join(__dirname, 'componentEditors'),
    components: path.join(__dirname, 'components'),
    data: path.join(__dirname, 'data'),
    runtime: path.join(__dirname, 'runtime'),
    settingsEditors: path.join(__dirname, 'settingsEditors'),
    bundleEditor: path.join(__dirname, 'bundleEditor'),
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },
  debug: true,
  devtool: 'eval-source-map',
  resolve: {
    alias: {
      npm: 'empty-module',
    },
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map',
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
};
