# ETHrelay

![alt text](https://github.com/sfl0r3nz05/ETH-relay/blob/master/img/img.png)

1. Adding testnet node in truffle-config.js
2. Installing truffle-hdwallet-provider (cd truffle && npm i)
3. truffle compile
4. truffle migrate --network ropsten
5. Install client packages (cd client && npm i)
6. Install server packages (cd server && npm i)
7. Set client address (nano client/src/App.js line 74)
8. Set server (ownwer) Address, Private Key and Smart Contract Address (nano server/web3/index.mjs)
9. Run client (cd client && npm start)
10. Run server (cd server && npm start)
