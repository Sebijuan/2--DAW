const express = require('express');
const router = express.Router();
const fibonacciRoutes = require('./fibonacciRoutes');

// Ruta base
router.get('/ping', (req, res) => res.send('pong'));

// Rutas específicas
router.use('/fibonacci', fibonacciRoutes);

module.exports = router;
