const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;
const FILES_DIR = path.join(__dirname, 'files');

// Crear la carpeta files/ si no existe
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

// Middleware para habilitar CORS
app.use(cors());

// Middleware para aumentar el tiempo de respuesta
app.use((req, res, next) => {
    res.setTimeout(600000, () => {
        res.status(408).send('Request timed out');
    });
    next();
});

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, FILES_DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post('/upload', upload.array('files'), (req, res) => {
    res.json({ message: 'Successfully uploaded files' });
});

// Ruta para descargar archivos
app.get('/download/:filename', (req, res) => {
    let filename = req.params.filename;
    let filePath = path.join(FILES_DIR, filename);

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
});

// Servir archivos estáticos desde la carpeta files
app.use('/files', express.static(FILES_DIR));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
