## Setting up for private net tests

Set up default key:

```bash
$ mkdir -p private_net/keystore
$ cp support/UTC--2015-08-09T04-06-35.465758600Z--6a5b342ec71def8aac337b82969d9ddd811023c9 private_net/keystore
```

Initialize blockchain with `private_genesis.json`:

```bash
$ geth --datadir private_net init support/private_genesis.json
```

Start the blockchain with password `abcd` and open as network `1234`:

```bash
# Mac OS X
$ geth --fast --cache 512 -ipcpath ~/Library/Ethereum/geth.ipc --networkid 1234 --datadir private_net --unlock 0 --rpc --rpccorsdomain="*" --rpcaddr "0.0.0.0"

# Linux
$ geth --fast --cache 512 -ipcpath ~/.ethereum/geth.ipc --networkid 1234 --datadir private_net --unlock 0 --rpc --rpccorsdomain="*" --rpcaddr "0.0.0.0"
```

Start mining from another terminal:

```bash
$ geth attach
> miner.start(1)
```

Stop mining from another terminal:

```bash
> miner.stop()
```