
const path = require('path');

module.exports = {
  resource: {
    test: /\.(je?pg,png,gif,webp)$/,
    include: [path.resolve(__dirname, '../../src/media/')],
  },
  use: {
    loader: 'url-loader',
    options: { limit: 8 * 1024 },
  },
};
