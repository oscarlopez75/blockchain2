
const calHash = require('./calHash');


class Block {
  constructor(index, timestamp, data, previousHash = '') {

    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = calHash.mineBlock(this.index, this.previousHash, this.timestamp, JSON.stringify(this.data).toString());
  }


}


module.exports.Block = Block;
