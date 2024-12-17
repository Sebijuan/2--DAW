const { expect } = require('chai');
const express = require('express');
const expressLoader = require('../../src/loaders/express');

    
    describe('Cargador de Express', () => {
      it('debería configurar la aplicación de Express correctamente', () => {
        const app = express();
        const config = {};

        expressLoader(app, config);

        expect(app._router).to.not.be.undefined;
      });
    });