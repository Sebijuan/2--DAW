const express = require('express');
const cors = require('cors');
const routes = require('../routes');
const logger = require('../utils/logger');

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1', routes);
  app.use((req, res) => res.status(404).send({ message: 'Not Found' }));

  app.get('/health', (req, res) => res.status(200).send('Server is running')); // Add this route

  app.use((err, req, res, next) => {
    logger.error(err.stack);
    res.status(500).send({ message: 'Internal Server Error' });
  });

  logger.info('Express loader initialized'); // Add this line to confirm express loader initialization
};