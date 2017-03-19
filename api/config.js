const fs = require('fs');
const CUSTOM_CONF_FILE = `./config.${process.env.B17_BANK}.json`;
let CONF_FILE = fs.existsSync(CUSTOM_CONF_FILE) ? CUSTOM_CONF_FILE : './config.json';

if (!module.parent) {
    console.log(CONF_FILE);
}
module.exports = require(CONF_FILE);
