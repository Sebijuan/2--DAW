const fs = require('fs');
const readline = require('readline');
const path = require('path');
const { logger } = require('./utils/logger');
const express = require('express');
const config = require('./config');
const multer = require('multer');
const { swaggerUi, specs } = require('./swagger');

const app = express();
app.use(express.json());


const notesDir = path.join(__dirname, 'controllers', 'notes');

if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, notesDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const args = process.argv.slice(2);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /upload_files:
 *   post:
 *     summary: Subir archivos .note
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Archivos subidos con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.post('/upload_files', upload.array('files'), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    res.json({ message: 'Archivos subidos con éxito' });
});

/**
 * @swagger
 * /download/{titulo}:
 *   get:
 *     summary: Descargar una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a descargar
 *     responses:
 *       200:
 *         description: Nota descargada con éxito
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Nota no encontrada
 */
app.get('/download/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Crear una nueva nota
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota creada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
app.post('/notas', (req, res) => {
    const { titulo, contenido } = req.body;
    const filePath = path.join(notesDir, `${titulo}.note`);
    fs.writeFileSync(filePath, contenido);
    res.json({ message: 'Nota creada con éxito' });
});

/**
 * @swagger
 * /notas/{titulo}:
 *   put:
 *     summary: Editar una nota existente
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nota editada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Nota no encontrada
 */
app.put('/notas/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const { contenido } = req.body;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, contenido);
        res.json({ message: 'Nota editada con éxito' });
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas/{titulo}:
 *   delete:
 *     summary: Eliminar una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a eliminar
 *     responses:
 *       200:
 *         description: Nota eliminada con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Nota no encontrada
 */
app.delete('/notas/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        res.json({ message: 'Nota eliminada con éxito' });
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Listar todas las notas
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de notas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/notas', (req, res) => {
    const files = fs.readdirSync(notesDir);
    const notas = files.map(file => file.replace('.note', ''));
    res.json(notas);
});

/**
 * @swagger
 * /notas/{titulo}:
 *   get:
 *     summary: Leer una nota
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a leer
 *     responses:
 *       200:
 *         description: Contenido de la nota
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *       404:
 *         description: Nota no encontrada
 */
app.get('/notas/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        const contenido = fs.readFileSync(filePath, 'utf8');
        res.json({ titulo, contenido });
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas/buscar/{titulo}:
 *   get:
 *     summary: Buscar una nota por título
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a buscar
 *     responses:
 *       200:
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 titulo:
 *                   type: string
 *                 contenido:
 *                   type: string
 *       404:
 *         description: Nota no encontrada
 */
app.get('/notas/buscar/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        const contenido = fs.readFileSync(filePath, 'utf8');
        res.json({ titulo, contenido });
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas/importante/{titulo}:
 *   post:
 *     summary: Marcar una nota como importante
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: titulo
 *         schema:
 *           type: string
 *         required: true
 *         description: Título de la nota a marcar como importante
 *     responses:
 *       200:
 *         description: Nota marcada como importante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Nota no encontrada
 */
app.post('/notas/importante/:titulo', (req, res) => {
    const titulo = req.params.titulo;
    const filePath = path.join(notesDir, `${titulo}.note`);
    if (fs.existsSync(filePath)) {
        const contenido = fs.readFileSync(filePath, 'utf8');
        const importantFilePath = path.join(notesDir, `${titulo}_important.note`);
        fs.writeFileSync(importantFilePath, contenido);
        res.json({ message: 'Nota marcada como importante' });
    } else {
        res.status(404).send({ message: 'Nota no encontrada' });
    }
});

/**
 * @swagger
 * /notas/importantes:
 *   get:
 *     summary: Filtrar notas importantes
 *     tags: [Notas]
 *     responses:
 *       200:
 *         description: Lista de notas importantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
app.get('/notas/importantes', (req, res) => {
    const files = fs.readdirSync(notesDir).filter(file => file.endsWith('_important.note'));
    const notasImportantes = files.map(file => file.replace('_important.note', ''));
    res.json(notasImportantes);
});

function mostrarMenuPrincipal() {
    console.log("\nEditor de Notas:");
    console.log("1. Crear nueva nota");
    console.log("2. Editar nota existente");
    console.log("3. Eliminar nota");
    console.log("4. Listar notas");
    console.log("5. Leer nota");
    console.log("6. Buscar nota por título");
    console.log("7. Marcar nota como importante");
    console.log("8. Filtrar notas importantes");
    console.log("9. Subir archivos .note");
    console.log("10. Descargar notas");
    console.log("0. Salir");
    rl.question("Seleccione una opción: ", manejarMenu);
}

function manejarMenu(opcion) {
    switch (opcion) {
        case '1':
            crearNota();
            break;
        case '2':
            editarNota();
            break;
        case '3':
            eliminarNota();
            break;
        case '4':
            listarNotas();
            break;
        case '5':
            leerNota();
            break;
        case '6':
            buscarNota();
            break;
        case '7':
            marcarNotaImportante();
            break;
        case '8':
            filtrarNotasImportantes();
            break;
        case '9':
            console.log("Ruta para subir archivos configurada. Usa un cliente HTTP para subir archivos.");
            mostrarMenuPrincipal();
            break;
        case '10':
            descargarNotas();
            break;
        case '0':
            rl.close();
            process.exit(0); // Termina el proceso de Node.js
            break;
        default:
            console.log("Opción no válida");
            mostrarMenuPrincipal();
            break;
    }
}

function crearNota() {
    rl.question("Título de la nota: ", titulo => {
        rl.question("Contenido de la nota: ", contenido => {
            const filePath = path.join(notesDir, `${titulo}.note`);
            fs.writeFileSync(filePath, contenido);
            console.log("Nota creada con éxito");
            mostrarMenuPrincipal();
        });
    });
}

function editarNota() {
    rl.question("Título de la nota a editar: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            rl.question("Nuevo contenido de la nota: ", contenido => {
                fs.writeFileSync(filePath, contenido);
                console.log("Nota editada con éxito");
                mostrarMenuPrincipal();
            });
        } else {
            console.log("Nota no encontrada");
            mostrarMenuPrincipal();
        }
    });
}

function eliminarNota() {
    rl.question("Título de la nota a eliminar: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log("Nota eliminada con éxito");
        } else {
            console.log("Nota no encontrada");
        }
        mostrarMenuPrincipal();
    });
}

function listarNotas() {
    const files = fs.readdirSync(notesDir);
    if (files.length === 0) {
        console.log("No hay notas disponibles");
    } else {
        console.log("Notas disponibles:");
        files.forEach(file => {
            console.log(file.replace('.note', ''));
        });
    }
    mostrarMenuPrincipal();
}

function leerNota() {
    rl.question("Título de la nota a leer: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            const contenido = fs.readFileSync(filePath, 'utf8');
            console.log(`Contenido de la nota "${titulo}":\n${contenido}`);
        } else {
            console.log("Nota no encontrada");
        }
        mostrarMenuPrincipal();
    });
}

function buscarNota() {
    rl.question("Título de la nota a buscar: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            const contenido = fs.readFileSync(filePath, 'utf8');
            console.log(`Nota encontrada:\nTítulo: ${titulo}\nContenido: ${contenido}`);
        } else {
            console.log("Nota no encontrada");
        }
        mostrarMenuPrincipal();
    });
}

function marcarNotaImportante() {
    rl.question("Título de la nota a marcar como importante: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            const contenido = fs.readFileSync(filePath, 'utf8');
            const importantFilePath = path.join(notesDir, `${titulo}_important.note`);
            fs.writeFileSync(importantFilePath, contenido);
            console.log("Nota marcada como importante");
        } else {
            console.log("Nota no encontrada");
        }
        mostrarMenuPrincipal();
    });
}

function filtrarNotasImportantes() {
    const files = fs.readdirSync(notesDir).filter(file => file.endsWith('_important.note'));
    if (files.length === 0) {
        console.log("No hay notas importantes disponibles");
    } else {
        console.log("Notas importantes disponibles:");
        files.forEach(file => {
            console.log(file.replace('_important.note', ''));
        });
    }
    mostrarMenuPrincipal();
}

function descargarNotas() {
    rl.question("Título de la nota a descargar: ", titulo => {
        const filePath = path.join(notesDir, `${titulo}.note`);
        if (fs.existsSync(filePath)) {
            console.log(`Nota "${titulo}" lista para descargar en /download/${titulo}`);
        } else {
            console.log("Nota no encontrada");
        }
        mostrarMenuPrincipal();
    });
}

if (args.length === 0) {
    mostrarMenuPrincipal();
} else {
    const opcion = args[0];
    manejarMenu(opcion);
}

const { port } = config.app;

app.listen(port, err => {
    if (err) {
        logger.error(err);
        return;
    }
    logger.info(`Servidor corriendo en el puerto ${port}!`);
});
