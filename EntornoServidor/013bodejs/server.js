const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Ruta /page: Devuelve el archivo page.html
app.get('/page', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'page.html'));
});

// Ruta /error: Devuelve el archivo error.html con código 404
app.get('/error', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
