import React, { Component } from "react";
import getWeb3 from "./getWeb3";
import ipfs from "./ipfs";
import axios from "axios";

import "./App.css";
const bs58 = require('bs58');

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { storageValue: 0, web3: null, accounts: null, contract: null, value: '', ipfsHash: null, signedHash: null, input: null, accountRecover: null };
    this.handleChangeValue = this.handleChangeValue.bind(this);
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Set web3 and accounts to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleChangeValue(event) {
    this.setState({
      value: event.target.value,
      input: [
        {
          id: this.state.value,
          date: '14.07.2018'
        }
      ]
    });
  };

  onIPFSSubmit = async (event) => {
    event.preventDefault();

    await ipfs.add(Buffer.from(JSON.stringify(this.state.input)), (err, ipfsHash) => {
      console.log(err, ipfsHash);
      //setState by setting ipfsHash to ipfsHash[0].hash 
      //this.setState({ ipfsHash:ipfsHash[0].hash });
      //console.log(this.state.ipfsHash);

      const bytes = Buffer.from(JSON.stringify(this.state.input));
      this.setState({ ipfsHash: bs58.encode(bytes) });
      console.log(this.state.ipfsHash)
    })
  };

  signhash = async (event) => {
    event.preventDefault();

    this.state.web3.eth.personal.sign(this.state.ipfsHash, "client_address", "test password!")
      .then(signed => {
        console.log(signed);
        this.setState({ signedHash: signed });

        axios.post('http://193.145.250.217:3006', {
          sign: this.state.signedHash,
          hash: this.state.ipfsHash,
          address: "client_address",
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            //console.log(error);
          });

      });

  };

  recoverhash = async (event) => {
    event.preventDefault();

    this.state.web3.eth.personal.ecRecover(this.state.ipfsHash, this.state.signedHash)
      .then(unsigned => {
        console.log(unsigned);
        this.setState({ accountRecover: unsigned });
      });
  };

  sendhash = async (event) => {
    event.preventDefault();

    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(this.state.ipfsHash).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>PoC of creator signing messages</h1>
        <p>1. The creator fill a form</p>
        <p>2. From IPFS Ropsten node an ipfs hash is generated</p>
        <p>3. The creator sign the message</p>
        <p>4. The message (hash, address of the contract owner) must be recovered</p>
        <p>5. The contract owner execute the transaction</p>
        <h2> 1. Add a file to IPFS here </h2>
        <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
          <label>
            Field:
              <input type="text" value={this.state.value} onChange={this.handleChangeValue} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p> The IPFS hash is: {this.state.ipfsHash}</p>
        <h2>2. Signing the hash</h2>
        <form id="ipfs-hash-form" className="scep-form" onSubmit={this.signhash}>
          <input type="submit" value="Sign" />
          <p> Sign and Transmit:{this.state.signedHash} </p>
        </form>
      </div>
    );
  }
}

export default App;