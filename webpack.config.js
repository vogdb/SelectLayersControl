const path = require('path')

module.exports = {
  entry: './src/SelectLayers.js',
  output: {
    filename: 'leaflet.select-layers.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  watchOptions: {
    ignored: '**/node_modules',
  },
};
