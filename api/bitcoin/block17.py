from pybitcointools import *
import sys
import argparse

TESTNET = False

# To spend some coins use:
# ./block17 --privbrain privkeybrain --dest destination --amount amount
parser = argparse.ArgumentParser('block17 backend')
parser.add_argument('--privbrain')
parser.add_argument('--dest')
parser.add_argument('--amount', type=int)
args = parser.parse_args()

priv = sha256(args.privbrain)
pub = privtopub(priv)
if TESTNET:
    addr = pubtoaddr(pub, 111)
else:
    addr = pubtoaddr(pub)
print(addr)

h = history(addr)
print(h)

utxoamount = 0
c = 0
ins = []
for item in h:
    if 'spend' not in item:
        utxoamount += int(item['value'])
        c += 1
        ins.append(item)

fee = 36861
args.amount *= 1000
changeamount = utxoamount - args.amount - fee

outs = [{
    'value': args.amount,
    'address': args.dest
}, {
    'value': changeamount,
    'address': addr
}];
print('tx Inputs: ')
print(ins)

print('tx Outputs: ')
print(outs)

tx = mktx(ins, outs)
for i in range(c):
    tx = sign(tx, i, priv)

pushtx(tx)
print 'Transaction is broadcasted'
