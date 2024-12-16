const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, 'admin.env') });

const app = express();
const upload = multer({ dest: 'uploads/' });
const notesDir = path.join(__dirname, 'notes');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Notas API',
            version: '1.0.0',
            description: 'API para gestionar notas'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local'
            }
        ]
    },
    apis: [path.join(__dirname, 'server.js')]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         path:
 *           type: string
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /import:
 *   post:
 *     summary: Importar notas
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Notas importadas correctamente
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: Token inválido
 */

/**
 * @swagger
 * /export:
 *   get:
 *     summary: Exportar notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Notas exportadas correctamente
 *         content:
 *           application/zip:
 *             schema:
 *               type: string
 *               format: binary
 *       401:
 *         description: Acceso denegado
 *       400:
 *         description: Token inválido
 */

// Middleware para autenticar usando JWT
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Acceso denegado');
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Token inválido');
    }
};

// Función para importar notas
const importNotes = (files) => {
    files.forEach(file => {
        const destPath = path.join(notesDir, file.originalname);
        fs.renameSync(file.path, destPath);
    });
};

// Función para exportar notas
const exportNotes = () => {
    const notes = fs.readdirSync(notesDir).filter(file => file.endsWith('.note'));
    return notes.map(note => ({ path: path.join(notesDir, note), name: note }));
};

// Ruta para importar notas
app.post('/import', authenticateJWT, upload.array('notes'), (req, res) => {
    importNotes(req.files);
    res.send('Notas importadas correctamente');
});

// Ruta para exportar notas
app.get('/export', authenticateJWT, (req, res) => {
    const notes = exportNotes();
    const zip = require('express-zip');
    res.zip(notes);
});

// Ruta para acceder a la API
app.get('/api', (req, res) => {
    res.send('Bienvenido a la API de Notas. Use /import para importar notas y /export para exportar notas.');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

