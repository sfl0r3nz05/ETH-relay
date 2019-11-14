const IPFS = require('ipfs-http-client');
//import Ipfs from 'ipfs-http-client';
//const ipfs = new Ipfs({ host: 'ipfs.infura.io', 
//    port: 5001,protocol: 'https' });
//const IPFS = require('ipfs-mini');
const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', timeout: 10 });

export default ipfs;