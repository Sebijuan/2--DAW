const express = require('express');
const router = express.Router();
const { getFibonacci } = require('../controllers/fibonacciController');

router.get('/:number', getFibonacci);

module.exports = router;
