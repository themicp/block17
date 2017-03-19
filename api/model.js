const mysql = require('mysql2/promise');
const config = require('./config');
const bitcoin = require('./bitcoin');

const getConnection = async () => {
    return mysql.createPool({
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
    let [rows, _] = await conn.execute('select * from ((select `id`, `sender` as `counterparty`, `amount`, `description`, `timestamp` from `transactions` where `recipient` = ?) union (select `id`, `recipient` as `counterparty`, -`amount` as `amount`, `description`, `timestamp` from `transactions` where `sender` = ?)) `TX` join `parties` on `TX`.`counterparty` = `parties`.`iban` order by `timestamp` desc', [party, party]);
    return rows;
};

const getBalance = async (conn, party) => {
    let txs = await getTransactions(conn, party);
    return txs.reduce((acc, tx) => {
        return acc + tx.amount;
    }, 0);
};

const getMyContacts = async (conn) => {
    let [rows, _] = await conn.execute('select * from `parties` where `iban` <> ?', [config.account.iban]);
    return rows;
};

const getMyAccount = async (conn) => {
    return getContact(conn, config.account.iban);
};

const putTransaction = async (conn, counterparty, description, amount) => {
    await conn.execute('insert into `transactions` (`sender`, `recipient`, `description`, `amount`) values (?, ?, ?, ?)', [config.account.iban, counterparty, description, amount]);
    
    const countercontact = await getContact(conn, counterparty);
    if (countercontact === null) {
        // stop
    }
    else {
        const counterbank = countercontact.bank;
        if (counterbank != config.bank.name) {
            console.log(`Sending clearance funds to ${counterbank}...`);
            const pubaddr = await getBankPubaddr(conn, counterbank);
            console.log(`Found blockchain address ${pubaddr}.`);

            console.log(`Sending...`);
            bitcoin.sendCoins(config.bank.privkey, pubaddr, 110).then((out) => {
                console.log('Transaction completed. Details:');
                console.log(out);
            }).catch((e) => {
                console.error('Transaction failed with error', e);
            });
        }
    }
};

const getBankPubaddr = async (conn, bank) => {
    let [rows, _] = await conn.execute('select btcaddr from `banks` where `name` = ?', [bank]);
    return rows[0].btcaddr;
};

const getContact = async (conn, iban) => {
    let [rows, _] = await conn.execute('select * from `parties` where `iban` like ?', [`%${iban}%`]);
	if (rows.length >= 1) {
		return rows[0];
	}
	else {
		return null;
	}
};

const advertiseMyPubAddr = async (conn, bank) => {
    await conn.execute('update `banks` set `btcaddr` = ? where `name` = ?', [config.bank.pubaddr, config.bank.name]);
};

const run = async () => {
    const conn = await getConnection();
    await getTransactions(conn, 'GR8802603040000660101220642');
    console.log(await getBalance(conn, 'GR8802603040000660101220642'));
    console.log(await getMyAccount(conn));
    console.log(await getBankPubaddr(conn, 'Beyondbank'));
};

if (!module.parent) {
    run();
}

module.exports = {
    getConnection,
    getBankDetails,
    getTransactions,
    getBalance,
    getMyContacts,
    getMyAccount,
    putTransaction,
    getContact,
    advertiseMyPubAddr
};
