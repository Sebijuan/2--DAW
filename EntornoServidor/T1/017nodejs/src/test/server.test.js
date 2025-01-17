const { startServer } = require('../loaders/server');

describe('Servidor', () => {
    test('Debe iniciar el servidor sin errores', () => {
        expect(() => startServer()).not.toThrow();
    });
});
