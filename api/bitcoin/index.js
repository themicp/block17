var exec = require('child_process').exec;
var request = require('request');

function sendCoins(privKey, toAddress, eurocentAmount) {
    return new Promise((resolve, reject) => {
        exec('python2 block17.py --amount ' + eurocentAmount + ' --privbrain ' + privKey + ' --dest ' + toAddress, {
            cwd: __dirname
        }, (err, stdout, stderr) => {
            if (err) {
                reject(stderr);
                return;
            }
            resolve(stdout);
        });
    });
}

function checkReceived(addr) {
    return new Promise((resolve, reject) => {
        request('https://blockchain.info/q/getreceivedbyaddress/' + addr, (err, resp, body) => {
            console.log(body);
            if (err) {
                reject(err);
                return;
            }
            var bitcoinAmount = parseInt(body, 10);
            var eurocentAmount = bitcoinAmount / 1000;
            resolve(Math.floor(eurocentAmount));
        });
    });
}

module.exports = {sendCoins, checkReceived};
