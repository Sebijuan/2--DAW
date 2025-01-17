const express = require('express');
const app = express();
const logger = require('./logger');
const authMiddleware = require('./authMiddleware');

app.use(logger);
app.use(authMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});