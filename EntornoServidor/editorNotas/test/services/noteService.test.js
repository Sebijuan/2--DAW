const { expect } = require('chai');
const fs = require('fs');
const path = require('path');
const noteService = require('../../src/services/noteService');

describe('Servicio de Notas', () => {
  const notesDir = path.join(__dirname, '../../src/controllers/notes');

  beforeEach(() => {
    if (!fs.existsSync(notesDir)) {
      fs.mkdirSync(notesDir);
    }
  });

  afterEach(() => {
    fs.rmdirSync(notesDir, { recursive: true });
  });

  it('debería crear una nota', async () => {
    const nota = { title: 'prueba', content: 'contenido de prueba' };
    await noteService.createNote(nota);
    const filePath = path.join(notesDir, 'prueba.txt');
    expect(fs.existsSync(filePath)).to.be.true;
  });


});