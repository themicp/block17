const route = require('koa-route');
const logger = require('koa-logger');
const koa = require('koa');
const app = module.exports = new koa();

app.use(logger());

app.use(route.get('/tx', (ctx) => {
    ctx.throw(501);
}));

app.use(route.put('/tx', (ctx) => {
    ctx.throw(501);
}));

app.use(route.get('/bank', (ctx) => {
    ctx.throw(501);
}));

app.use(route.get('/account', (ctx) => {
    ctx.throw(501);
}));

app.use(route.get('/contacts', (ctx) => {
    ctx.throw(501);
}));

if (!module.parent) {
    app.listen(3000);
}
