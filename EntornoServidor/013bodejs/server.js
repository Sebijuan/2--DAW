const express = require('express');
const app = express();
const port = 3000;


app.get('/page', (req, res) => {
    res.send('<h1>Bienvenido a la página principal</h1><p>Esta es la página de contenido principal.</p>');
});


app.get('/error', (req, res) => {
    res.status(404).send('<h1>Error 404</h1><p>Página no encontrada.</p>');
});


app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
