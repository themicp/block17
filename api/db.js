const config = require('./config.json');
const child_process = require('child_process');
const fs = require('fs');

const SCHEMA_FILE = './schema.sql';

const createTables = (dbConf) => {
    const passPart = (dbConf.pass.length > 0) ? `-p ${dbConf.pass}` : '';
    const cmd = `mysql -u ${dbConf.user} ${passPart} ${dbConf.name}`;
    console.log('Importing the schema...');
    console.log(`Running \`${cmd}\`...`);
    child_process.execSync(cmd, {
        input: fs.readFileSync(SCHEMA_FILE)
    });
    console.log('Done.');
};

if (!module.parent) {
    createTables(config.db);
}
