const express = require('express');
const loaders = require('./loaders/loader');
const config = require('./config');

const app = express();

loaders.init(app, config);

module.exports = app;