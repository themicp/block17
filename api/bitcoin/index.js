var exec = require('child_process').exec;
var request = require('request');
var EUROBANK_ADDR = '1Q2HwzYwFuWFoYy4TxGuDVrboPaVFrJLjc';
var BEYONDBANK_ADDR = '12qn3SVU9d5wFMrZXPadw8mRCpYNx9xCmt';
var EUROBANK_PRIV = 'beyond-hackathon-wallet-1812378912309812-eurobank';
var BEYONDBANK_PRIV = 'beyond-hackathon-wallet-1812378912309812-beyondbank';

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

if (!module.parent) {
    // simple usage example
    checkReceived(EUROBANK_ADDR).then(
        (balance) => console.log('Eurobank balance: ' + balance)
    );
    checkReceived(BEYONDBANK_ADDR).then(
        (balance) => console.log('Beyondbank balance: ' + balance)
    );
    sendCoins(EUROBANK_PRIV, BEYONDBANK_ADDR, 100).then((stdout) => {
        console.log('Amount sent successfully:');
        console.log(stdout);
    }).catch((err) => {
        console.log('Failed to send coins:');
        console.log(err);
    });
}
