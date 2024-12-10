
import request from 'supertest';
import express from 'express';
import notesRouter from '../routes/notes.js';

const app = express();
app.use('/notes', notesRouter);

describe('POST /notes/create', () => {
    it('should create a note', async () => {
        const response = await request(app)
            .post('/notes/create')
            .send({});

        expect(response.status).toBe(201);
        expect(response.text).toBe('Nota creada con éxito.');
    });

    it('should handle errors', async () => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
        const response = await request(app)
            .post('/notes/create')
            .send({});

        expect(response.status).toBe(500);
        expect(response.text).toBe('Error al crear la nota.');
    });
});