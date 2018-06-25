const SHA256 = require('crypto-js/sha256');
const difficulty = 4;

var calculateHash = (index, previousHash, timestamp, data, nonce) => {
  return SHA256(index + previousHash + timestamp + JSON.stringify(data) + nonce).toString();
}


var mineBlock = (index, previousHash, timestamp, data) => {
  mineHash = "";
  nonce = 0;
  while(mineHash.substring(0, difficulty) != Array(difficulty + 1).join("0")){
    nonce = nonce + 1;
    mineHash = calculateHash(index, previousHash, timestamp, data, nonce);
  }

  return mineHash;
}

module.exports.calculateHash = calculateHash;
module.exports.mineBlock = mineBlock;
