#!/bin/bash
ADDR="$(cat build/contracts/Billboard.sol.js | grep '"address":' | sed 's/.*"address": "\(.*\)".*/\1/')"
sed -i '' -e "s/var billboardAddress = '.*';/var billboardAddress = '${ADDR}';/g" app/js/app.js