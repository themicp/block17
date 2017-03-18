const mysql = require('mysql2/promise');
const config = require('./config.json');

const getConnection = async () => {
    return mysql.createConnection({
        host: config.db.host,
        user: config.db.user,
        pass: config.db.pass,
        database: config.db.name
    });
};

const getBankDetails = async (conn, name) => {
    let [rows, _] = await conn.execute('select * from `banks` where `name` = ?', [name]);
    return rows;
};

const getTransactions = async (conn, party) => {
    let [rows, _] = await conn.execute('select `id`, `timestamp`, `sender`, `recipient`, `description`, -`amount` as `amount` from `transactions` where `sender` = ? union select `id`, `timestamp`, `sender`, `recipient`, `description`, `amount` from `transactions` where `recipient` = ?', [party, party]);
    return rows;
};

const getBalance = async (conn, party) => {
    let txs = await getTransactions(conn, party);
    return txs.reduce((acc, tx) => {
        return acc + tx.amount;
    }, 0);
};

const getContacts = async (conn) => {
    let [rows, _] = await conn.execute('select * from `parties`');
    return rows;
};

const getMyAccount = async (conn) => {
    console.log(config.account.iban);
    let [rows, _] = await conn.execute('select * from `parties` where `iban` like ?', [`%${config.account.iban}%`]);
    return rows;
};

const putTransaction = async (conn, counterparty, description, amount) => {
    await conn.execute('insert into `transactions` (`sender`, `recipient`, `description`, `amount`) values (?, ?, ?, ?)', [config.account.iban, counterparty, description, amount]);
};

const run = async () => {
    const conn = await getConnection();
    await getTransactions(conn, 'GR8802603040000660101220642');
    console.log(await getBalance(conn, 'GR8802603040000660101220642'));
    console.log(await getMyAccount(conn));
};

if (!module.parent) {
    run();
}

module.exports = {
    getConnection,
    getBankDetails,
    getTransactions,
    getBalance,
    getContacts,
    getMyAccount,
    putTransaction
};
