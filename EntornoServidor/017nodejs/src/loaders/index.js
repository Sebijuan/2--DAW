const expressLoader = require('./express');

async function init(app) {
  await expressLoader(app);
}

module.exports = {
  init,
};