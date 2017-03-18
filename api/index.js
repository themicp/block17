const route = require('koa-route');
const logger = require('koa-logger');
const koa = require('koa');
const app = module.exports = new koa();

app.use(logger());

const index = (ctx) => {
    ctx.body = 'hello world';
};

app.use(route.get('/', index));

if (!module.parent) {
    app.listen(3000);
}
