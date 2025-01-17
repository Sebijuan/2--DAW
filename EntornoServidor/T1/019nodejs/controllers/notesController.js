import fs from 'fs';
import path from 'path';
import readlineSync from 'readline-sync';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesDir = path.join(__dirname, '../notes');
const notesFilePath = path.join(__dirname, '../data/notes.json');

// Crear directorio de notas si no existe
if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
}

export const getNotes = (req, res) => {
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading notes');
            return;
        }
        res.json(JSON.parse(data));
    });
};

export const createNote = (req, res) => {
    const newNote = req.body;
    fs.readFile(notesFilePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading notes');
            return;
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(notesFilePath, JSON.stringify(notes), (err) => {
            if (err) {
                res.status(500).send('Error saving note');
                return;
            }
            res.status(201).send('Note created');
        });
    });
};