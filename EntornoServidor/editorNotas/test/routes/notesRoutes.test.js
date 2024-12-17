const request = require('supertest');
const express = require('express');
const routes = require('../../src/routes/routes');

    
    describe('Rutas de Notas', () => {
      let app;

      beforeEach(() => {
        app = express();
        app.use('/api/v1', routes);
      });

      it('debería obtener todas las notas', async () => {
        const res = await request(app).get('/api/v1/notes');
        expect(res.status).to.equal(200);
      });


    });