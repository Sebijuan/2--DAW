const { Router } = require('express');
const { createNote, editNote, deleteNote, listNotes } = require('../controllers/notes');

const router = Router();

router.post('/', createNote);
router.put('/:id', editNote);
router.delete('/:id', deleteNote);
router.get('/', listNotes);

module.exports = router;