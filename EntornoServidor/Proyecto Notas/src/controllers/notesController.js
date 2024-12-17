const noteService = require('../services/noteService');

    

    async function getNotes(req, res, next) {
      const { title, sort, offset = 0, limit = 10 } = req.query;
      let notes = await noteService.getNotes(title);
      if (sort) {
        notes = notes.sort((a, b) => {
          if (sort === 'title') {
            return a.localeCompare(b);
          } else if (sort === '-title') {
            return b.localeCompare(a);
          }
          return 0;
        });
      }
   
  
          const paginatedNotes = notes.slice(parseInt(offset), parseInt(offset) + parseInt(limit));
          res.status(200).send({
            total: notes.length,
            offset: parseInt(offset),
            limit: parseInt(limit),
            results: paginatedNotes,
          });
        }

        async function getNoteById(req, res, next) {
          const note = await noteService.getNoteById(req.params.id);
          res.status(200).send(note);
        }

        async function createNote(req, res, next) {
          const note = await noteService.createNote(req.body);
          res.status(201).send(note);
        }

        async function updateNote(req, res, next) {
          const note = await noteService.updateNote(req.params.id, req.body);
          res.status(200).send(note);
        }

        async function deleteNote(req, res, next) {
          await noteService.deleteNote(req.params.id);
          res.status(204).send();
        }

        module.exports = {
          getNotes,
          getNoteById,
          createNote,
          updateNote,
          deleteNote,
        };