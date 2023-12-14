const express = require('express');
const { keccak256 } = require('ethereum-cryptography/keccak');
const verifyProof = require('../utils/verifyProof');
const niceList= require('../utils/niceList.json');
const  MerkleTree= require('../utils/MerkleTree')
const  merkleTree= new  MerkleTree(niceList)
const port = 1225;
const app = express();
app.use(express.json());
// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =  merkleTree.getRoot();
app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const {proof,  claimedIdentity}=body;
  console.log(proof)
  // TODO: prove that a name is in the list 
  const isInTheList = verifyProof( proof,  claimedIdentity,MERKLE_ROOT);
  if(isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
