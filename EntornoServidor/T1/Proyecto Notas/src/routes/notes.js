const { Router } = require('express');
const { getNotes, getNoteById, createNote, updateNote, deleteNote } = require('../controllers/notesController');

const router = Router();

router.get('/', getNotes);
router.post('/', createNote);
router.get('/:id', getNoteById);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;