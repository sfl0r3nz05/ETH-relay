import { recoverhash, sendhash } from "../web3";
import { queryaddress } from "../models/Address";

const addressSign = async (req, res) => {
    const { sign, hash } = req.body;
    console.info("sing ", sign);
    console.info("hash ", hash);

    const address = await recoverhash(hash, sign);
    console.log("address", address);

    const resp = await queryaddress(address);
    console.log(resp);

    const value = await sendhash(hash);
    console.log(value);

    if (value) {
        res.sendStatus(200);
    }
}

export { addressSign };