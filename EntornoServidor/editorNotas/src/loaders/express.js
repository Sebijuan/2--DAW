const express = require('express');
const cors = require('cors');
const routes = require('../routes/routes');

module.exports = (app, config) => {
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.use('/api/v1', routes);


  app.get('/', (req, res) => {
    res.send('Holaaaa que pasa este es el editor de notaaaas');
  });

  app.use((req, res) => res.status(404).send({ mensaje: 'No encontrado' }));
};