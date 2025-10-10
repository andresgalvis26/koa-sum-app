const Koa = require('koa');
const Router = require('koa-router');
const logger = require('./logger');

const app = new Koa();
const router = new Router();
const sum = require('./sum');

router.get('/', (ctx, next) => {
    ctx.body = 'Welcome to the Koa server! Use /add/:a/:b to add two numbers.';
    logger.info('Root path accessed');
});


router.get('/add/:a/:b', (ctx, next) => {
    const result = sum(parseFloat(ctx.params.a), parseFloat(ctx.params.b));
    logger.info(`Addition requested: ${ctx.params.a} + ${ctx.params.b}`);
    ctx.body = `The sum of ${ctx.params.a} and ${ctx.params.b} is ${result}`;
    logger.info(`Addition response: ${ctx.body}`);
});


router.get('/rest/:a/:b', (ctx, next) => {
    const a = parseFloat(ctx.params.a);
    const b = parseFloat(ctx.params.b);
    logger.info(`Subtraction requested: ${a} - ${b}`);
    const result = a - b;
    ctx.body = `The result of ${a} - ${b} is ${result}`;
    logger.info(`Subtraction response: ${ctx.body}`);
});





router.get('*', (ctx) => {
    ctx.status = 404;
    ctx.body = '404 Not Found';
    logger.warn(`404 Not Found: ${ctx.request.url}`);
});

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port:', process.env.PORT || 3000);
    logger.info('Server started');
});