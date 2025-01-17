const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Ruta /header
app.get('/header', (req, res) => {
    const token = req.headers['token'];
    if (!token) {
        return res.status(401).json({
            code: 401,
            error: "Unauthorized",
            message: "Error: Set a token to login"
        });
    }
    console.log(token);
    res.send('Token received');
});

// Ruta /params
app.get('/params/:name', (req, res) => {
    const name = req.params.name;
    res.send(`Hola ${name}`);
});

// Ruta /query
app.get('/query', (req, res) => {
    const n = parseInt(req.query.n) || 100;
    const sum = (n * (n + 1)) / 2;
    res.send(`La suma de todos los números desde el 1 hasta ${n} es ${sum}`);
});

// Ruta /body
app.post('/body', (req, res) => {
    const body = req.body;
    let htmlList = '<ul>';
    for (const key in body) {
        htmlList += `<li>${key}: ${body[key]}</li>`;
    }
    htmlList += '</ul>';
    res.send(htmlList);
});

// Enrutador /animals
const animalsRouter = express.Router();

animalsRouter.get('/dog', (req, res) => {
    res.json({ grow: "guau guau" });
});

animalsRouter.get('/cat', (req, res) => {
    res.json({ grow: "miau" });
});

animalsRouter.get('/bird', (req, res) => {
    res.json({ grow: "pio pio" });
});

app.use('/animals', animalsRouter);

// Ruta para manejar el resto de rutas no definidas
app.use((req, res) => {
    res.status(404).json({
        code: 404,
        error: "Not Found",
        message: "Error: Path not found"
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});