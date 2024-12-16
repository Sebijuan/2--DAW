const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const FILES_DIR = path.join(__dirname, 'files');

// Crear la carpeta files/ si no existe
if (!fs.existsSync(FILES_DIR)) {
    fs.mkdirSync(FILES_DIR);
}

// Middleware para manejar la subida de archivos
app.use(fileUpload());

// Ruta para subir archivos
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.file;
    let uploadPath = path.join(FILES_DIR, uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
    });
});

// Ruta para descargar archivos
app.get('/download/:filename', (req, res) => {
    let filename = req.params.filename;
    let filePath = path.join(FILES_DIR, filename);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
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
