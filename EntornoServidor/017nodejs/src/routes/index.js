const { Router } = require('express');
const notesRouter = require('./notes');

// ...existing code...

const router = Router();

router.use('/notes', notesRouter);

// ...existing code...

module.exports = router;