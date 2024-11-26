const express = require('express');
const logger = require('./logger');

const app = express();

// Use the logger middleware
app.use(logger);

// Define a simple route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Define another route to test different status codes
app.get('/error', (req, res) => {
    res.status(500).send('Internal Server Error');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Open your browser and navigate to http://localhost:3000');
});