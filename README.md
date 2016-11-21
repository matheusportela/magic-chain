# magic-chain
Magic: The Gathering marketplace using blockchain technology with Ethereum

# Requirements

First of all, install Ethereum tools: [geth](https://github.com/ethereum/go-ethereum) or [testrpc](https://github.com/ethereumjs/testrpc) and [truffle](https://github.com/ConsenSys/truffle).

# Running

Now, in one terminal, run a blockchain with `geth` or `testrpc`. The latter is recommended for development purposes because it processes blocks much faster than the former.

```bash
$ testrpc
```

If you prefer using `geth`, use the provided script `make_private_net.sh`. It clears all previous blockchains and run a new one. When asked, insert the password: `abcd`.

```bash
$ ./make_private_net.sh
Password: abcd
```

Now, in another terminal, run the project with the script `start.sh`. It deploys all contracts and update the front-end with the correct contract address.

```bash
$ ./start.sh
```

You can access the project at [http://localhost:8080](http://localhost:8080).
