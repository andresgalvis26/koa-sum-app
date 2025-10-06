const assert = require('assert');
const sum = require('../sum');

describe('Unit Tests - sum function', () => {
    it('debería retornar 5 al sumar 2 + 3', function () {
        assert.strictEqual(sum(2, 3), 5);
    });

    it('debería funcionar con negativos', function () {
        assert.strictEqual(sum(-2, 5), 3);
    });

    it('Debería retornar 0 cuando sumo 0 + 0', () => {
        assert.strictEqual(sum(0, 0), 0);
    });

    it('Debería retornar 2.5 cuando sumo 1.5 + 1.0', () => {
        assert.strictEqual(sum(1.5, 1.0), 2.5);
    });

    // it('debería retornar NaN si no son números', function () {
    //     assert.ok(Number.isNaN(sum('a', 5)));
    // });

    // Prueba que falla intencionalmente
    // it('Fallará porque espero un número incorrecto', () => {
    //     assert.strictEqual(sum(2, 2), 5);
    // });
})