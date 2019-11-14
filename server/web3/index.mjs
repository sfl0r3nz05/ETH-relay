import Web3 from "web3";
import SimpleStorageContract from "../contracts/SimpleStorage";

const provider = new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/ID"
);

const web3 = new Web3(provider || Web3.providers);

export const recoverhash = async (hash, sign) => {
    const address = web3.eth.accounts.recover(hash, sign);
    return address;
}

export const sendhash = async (hash) => {
    const account = web3.eth.accounts.wallet.add({
        privateKey: 'server_private_key',
        address: 'server_address'
    });

    const mycontract = await new web3.eth.Contract(SimpleStorageContract.abi, 'Smart_Contract_Address_Server', {
        from: 'server_address', // default from address
        gasPrice: '20000000000', // default gas price in wei, 20 gwei in this case
        gas: 1000000
    });

    const value = await mycontract.methods.set(hash).send({ from: account.address });
    return value;
}