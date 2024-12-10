
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import notesRouter from './routes/notes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Logger middleware
app.use(morgan('combined'));

// Routes
app.use('/notes', notesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});