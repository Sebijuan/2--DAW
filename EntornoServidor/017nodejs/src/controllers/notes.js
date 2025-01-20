const fs = require('fs');
const path = require('path');
const logger = require('../utils/logger');

const notesDir = path.join(__dirname, '../../notes');

function createNote(req, res) {
  const { title, content } = req.body;
  const noteId = Date.now().toString();
  const note = { id: noteId, title, content };
  const filePath = path.join(notesDir, `${noteId}.json`);

  fs.writeFile(filePath, JSON.stringify(note), (err) => {
    if (err) {
      logger.error(`Failed to create note: ${err.message}`);
      return res.status(500).json({ error: 'Failed to create note' });
    }
    res.status(201).json(note);
  });
}

function editNote(req, res) {
  const { id } = req.params;
  const { title, content } = req.body;
  const filePath = path.join(notesDir, `${id}.json`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      logger.error(`Note not found: ${err.message}`);
      return res.status(404).json({ error: 'Note not found' });
    }

    const note = JSON.parse(data);
    note.title = title;
    note.content = content;

    fs.writeFile(filePath, JSON.stringify(note), (err) => {
      if (err) {
        logger.error(`Failed to update note: ${err.message}`);
        return res.status(500).json({ error: 'Failed to update note' });
      }
      res.json(note);
    });
  });
}

function deleteNote(req, res) {
  const { id } = req.params;
  const filePath = path.join(notesDir, `${id}.json`);

  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(`Note not found: ${err.message}`);
      return res.status(404).json({ error: 'Note not found' });
    }
    res.status(204).end();
  });
}

function listNotes(req, res) {
  fs.readdir(notesDir, (err, files) => {
    if (err) {
      logger.error(`Failed to list notes: ${err.message}`);
      return res.status(500).json({ error: 'Failed to list notes' });
    }

    const notes = files.map((file) => {
      const filePath = path.join(notesDir, file);
      const data = fs.readFileSync(filePath);
      return JSON.parse(data);
    });

    res.json(notes);
  });
}

module.exports = {
  createNote,
  editNote,
  deleteNote,
  listNotes,
};