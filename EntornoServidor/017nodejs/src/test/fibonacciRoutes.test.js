const request = require('supertest');
const express = require('express');
const routes = require('../routes');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('Rutas de Fibonacci', () => {
    test('/ping debe devolver pong', async () => {
        const res = await request(app).get('/ping');
        expect(res.text).toBe('pong');
        expect(res.statusCode).toBe(200);
    });

    test('/fibonacci/:number debe devolver Fibonacci', async () => {
        const res = await request(app).get('/fibonacci/5');
        expect(res.body).toEqual({ number: 5, result: 5 });
        expect(res.statusCode).toBe(200);
    });
});
