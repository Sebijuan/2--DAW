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


app.get('/fizzbuzz', (req, res) => {
    const number = parseInt(req.query.number, 10);

    if (isNaN(number) || number < 1) {
        return res.status(400).send("Por favor, proporciona un número válido mayor a 0 en la query string.");
    }

    const fizzBuzzArray = [];
    for (let i = 1; i <= number; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            fizzBuzzArray.push("FizzBuzz");
        } else if (i % 3 === 0) {
            fizzBuzzArray.push("Fizz");
        } else if (i % 5 === 0) {
            fizzBuzzArray.push("Buzz");
        } else {
            fizzBuzzArray.push(i);
        }
    }

    res.send(fizzBuzzArray.join(', '));
});


app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
