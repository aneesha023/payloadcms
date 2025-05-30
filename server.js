const app = require('./dist/server').default;

module.exports = (req, res) => {
  app(req, res);
};
