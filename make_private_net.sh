rm -rf private_net/
mkdir -p private_net/keystore
cp support/UTC--2015-08-09T04-06-35.465758600Z--6a5b342ec71def8aac337b82969d9ddd811023c9 private_net/keystore
geth --datadir private_net init support/private_genesis.json

# Linux
geth --fast --cache 512 -ipcpath ~/.ethereum/geth.ipc --networkid 1234 --datadir private_net --unlock 0 --rpc --rpccorsdomain="*" --rpcaddr "0.0.0.0"

# Mac OS X
# geth --fast --cache 512 -ipcpath ~/Library/Ethereum/geth.ipc --networkid 1234 --datadir private_net --unlock 0 --rpc --rpccorsdomain="*" --rpcaddr "0.0.0.0"
