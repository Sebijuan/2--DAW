const expressLoader = require('./express');

function init(app, config) {
  expressLoader(app, config);
}

module.exports = {
  init,
};