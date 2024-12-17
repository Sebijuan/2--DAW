const fs = require('fs');
const path = require('path');
const Note = require('../models/note');

const notesDir = path.join(__dirname, '../controllers/notes');

    

    if (!fs.existsSync(notesDir)) {
      fs.mkdirSync(notesDir);
    }

    async function getNotes(title) {
      const files = fs.readdirSync(notesDir);
      let notes = files.map(file => file.replace('.txt', ''));
      if (title) {
        notes = notes.filter(note => note.includes(title));
      }
      return notes;
    }

    async function getNoteById(id) {
      const filePath = path.join(notesDir, `${id}.txt`);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        return Note.fromJSON({ title: id, content });
      }
      throw new Error('Nota no encontrada');
    }

    async function createNote({ title, content }) {
      const filePath = path.join(notesDir, `${title}.txt`);
      fs.writeFileSync(filePath, content);
      return new Note(title, content);
    }

    async function updateNote(id, { content }) {
      const filePath = path.join(notesDir, `${id}.txt`);
      if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
        return new Note(id, content);
      }
      throw new Error('Nota no encontrada');
    }

    async function deleteNote(id) {
      const filePath = path.join(notesDir, `${id}.txt`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        throw new Error('Nota no encontrada');
      }
    }

    module.exports = {
      getNotes,
      getNoteById,
      createNote,
      updateNote,
      deleteNote,
    };