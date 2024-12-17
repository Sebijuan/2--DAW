const { expect } = require('chai');
const sinon = require('sinon');
const notesController = require('../../src/controllers/notesController');
const noteService = require('../../src/services/noteService');

    


    describe('Controlador de Notas', () => {
      it('debería obtener todas las notas', async () => {
        const req = {};
        const res = {
          status: sinon.stub().returnsThis(),
          send: sinon.stub(),
        };
        const next = sinon.stub();

        sinon.stub(noteService, 'getNotes').resolves(['nota1', 'nota2']);

        await notesController.getNotes(req, res, next);

        expect(res.status.calledWith(200)).to.be.true;
        expect(res.send.calledWith(['nota1', 'nota2'])).to.be.true;

        noteService.getNotes.restore();
      });

      
    });