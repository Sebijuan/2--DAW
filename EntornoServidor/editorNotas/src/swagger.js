const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

  

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
                    url: 'http://localhost:3002',
                },
            ],
        },
        apis: ['./src/index.js'], 
    };

    const specs = swaggerJsdoc(options);

    module.exports = {
        swaggerUi,
        specs,
    };