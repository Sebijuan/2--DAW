const express = require('express');
const routes = require('../routes');

const startServer = () => {
    const app = express();

    // Middleware para analizar JSON
    app.use(express.json());

    // Configuración de rutas
    app.use('/', routes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
};

module.exports = { startServer };
