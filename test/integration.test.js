const request = require('supertest');
const Koa = require('koa');
const Router = require('koa-router');
const sum = require('../sum');

// Creamos una app mínima para pruebas
function createApp() {
    const app = new Koa();
    const router = new Router();

    router.get('/add/:a/:b', (ctx) => {
        const result = sum(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
        ctx.body = { result }; // Retornamos JSON para facilitar las pruebas
    });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    return app;
}

describe('Integration Tests - /add endpoint', () => {
    let app;

    before(() => {
        app = createApp();
    });

    it('debería retornar 12 al sumar 5 + 7', async () => {
        const res = await request(app.callback()).get('/add/5/7');
        if (res.status !== 200) throw new Error(`Expected status 200 but got ${res.status}`);
        if (res.body.result !== 12) throw new Error(`Expected result 12 but got ${res.body.result}`);
    });

    it('debería retornar -1 cuando consulto /add/-2/1', async () => {
        const res = await request(app.callback()).get('/add/-2/1');
        if (res.status !== 200) throw new Error(`Expected status 200 but got ${res.status}`);
        if (res.body.result !== -1) throw new Error(`Expected result -1 but got ${res.body.result}`);
    });
});