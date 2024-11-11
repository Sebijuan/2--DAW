const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/page', (req, res) => {
    const name = req.query.name;

    
    fs.readFile(path.join(__dirname, 'views', 'page.html'), 'utf-8', (err, data) => {
        if (err) {
            res.status(500).send("Error al cargar la página");
        } else {
            
            const pageContent = name ? data.replace('${name}', `Hello, ${name}!`) : data.replace('${name}', 'Bienvenido a la Página Principal');
            res.send(pageContent);
        }
    });
});


app.get('/error', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', 'error.html'));
});


app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

