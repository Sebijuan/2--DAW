const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Editor de Notas API',
            version: '1.0.0',
            description: 'API para gestionar notas',
        },
        servers: [
            {
                url: 'http://localhost:3000', 
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Ensure this path is correct
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true })); // Enable explorer

app.get('/', (req, res) => {
    res.send('Welcome to the Editor de Notas API');
});

const port = 3002;

function startServer(port) {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.error(`Port ${port} is already in use`);
        } else {
            console.error('Server error:', err);
        }
    });
}

startServer(port);

module.exports = {
    swaggerUi,
    specs,
};