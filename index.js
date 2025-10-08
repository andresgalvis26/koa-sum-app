const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const sum = require('./sum');

router.get('/', (ctx, next) => {
    ctx.body = 'Welcome to the Koa server! Use /add/:a/:b to add two numbers.';
});


router.get('/add/:a/:b', (ctx, next) => {
    const result = sum(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    ctx.body = `The sum of ${ctx.params.a} and ${ctx.params.b} is ${result}`;
});


router.get('/rest/:a/:b', (ctx, next) => {
    const a = parseFloat(ctx.params.a);
    const b = parseFloat(ctx.params.b);
    const result = a - b;
    ctx.body = `The result of ${a} - ${b} is ${result}`;
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port:', process.env.PORT || 3000);
});