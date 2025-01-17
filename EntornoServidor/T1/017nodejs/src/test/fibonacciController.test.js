const { getFibonacci } = require('../controllers/fibonacciController');

describe('Fibonacci Controller', () => {
    test('Debe devolver el número de Fibonacci correcto', () => {
        const req = { params: { number: '5' } };
        const res = { json: jest.fn() };

        getFibonacci(req, res);
        expect(res.json).toHaveBeenCalledWith({ number: 5, result: 5 });
    });

    test('Debe manejar un número inválido', () => {
        const req = { params: { number: 'abc' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        getFibonacci(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Debe proporcionar un número válido' });
    });
});
