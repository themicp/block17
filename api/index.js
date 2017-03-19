const json = require('koa-json');
const route = require('koa-route');
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const koa = require('koa');
const app = module.exports = new koa();

const config = require('./config.json');
const model = require('./model');

app.use(logger());
app.use(json());
app.use(bodyparser());

let conn;

app.use(route.get('/tx', async (ctx) => {
    ctx.body = await model.getTransactions(conn, config.account.iban);
}));

app.use(route.put('/tx', async (ctx) => {
    const r = ctx.request.body;
    const required_params = new Set(['counterparty', 'description', 'amount']);
    console.log(Object.keys(r));

    if (Object.keys(r).filter((key) => required_params.has(key)).length != required_params.size) {
        ctx.body = {error: 1};
        return;
    }

    try {
        await model.putTransaction(conn,
            r.counterparty,
            r.description,
            r.amount);
        ctx.body = {error: 0};
    } catch (e) {
        ctx.body = {error: 1};
    }
}));

app.use(route.get('/bank', (ctx) => {
    ctx.body = config.bank;
}));

app.use(route.get('/account', async (ctx) => {
    ctx.body = await model.getMyAccount(conn);
}));

app.use(route.get('/contacts', async (ctx) => {
    ctx.body = await model.getContacts(conn);
}));

const run = async () => {
    conn = await model.getConnection();
    app.listen(3000);

    //await model.getTransactions(conn, 'GR8802603040000660101220642');
    //console.log(await model.getBalance(conn, 'GR8802603040000660101220642'));
};

if (!module.parent) {
    run();
}
