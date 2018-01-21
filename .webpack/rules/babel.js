
const path = require('path');

module.exports = {
  resource: {
    test: /\.jsx?$/,
    include: [path.resolve(__dirname, '../../src/')],
  },
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['env', 'react'],
    },
  },
};
