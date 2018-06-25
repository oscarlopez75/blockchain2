var blockMod = require('./block');
const calHash = require('./calHash');
var Blocks     = require('../models/block.model');


var block = function (empty, data){
  return new Promise(function(resolve, reject){
    if(empty){
      resolve(new blockMod.Block(0, data.timestamp, 'Genesis block', '0'));
    }else{
      Blocks.find({}, null, {sort: {index: 1}}, function(err, docs){
        if(err){
          console.log(err);
          reject(err);
        }else{
          isChainValid(docs)
            .then(function(result){
              lastIndex = docs[docs.length - 1].index;
              previousHash = docs[docs.length - 1].hash;
              resolve(new blockMod.Block(lastIndex + 1, data.timestamp, {amount: data.amount, login: data.login}, previousHash));
            })
            .catch(function(err){
              console.log(err);
              reject(err);
            });
        }
      });
    }
  });
}

var isChainValid = function(docs){
  return new Promise(function(resolve, reject){
    for(let i = 1; i < docs.length; i++){
      let currentBlock = docs[i];
      let previousBlock = docs[i - 1];

      if(currentBlock.hash != calHash.mineBlock(currentBlock.index, currentBlock.previousHash, currentBlock.timestamp, JSON.stringify(currentBlock.data).toString())){
        reject('Not able to add the new block since some one fucked with block ' + currentBlock.index);
      }else if(currentBlock.previousHash != previousBlock.hash){
        reject('There is a block missing between block ' + previousBlock.index + ' and block ' + currentBlock.index);
      }

    }
    resolve("Chain correct");
  });
}
/*
isChainValid(){
    for(let i = 0; i < this.chain.length; i++){
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];


      if(currentBlock.hash != calHash.mineBlock(currentBlock.index, currentBlock.previousHash, currentBlock.timestamp, JSON.stringify(currentBlock.data).toString())){
          return ('Some one fucked with block ' + i);
      }
    }

    return "All good, blockchain unchanged";
  }

*/
module.exports.block = block;

//{ amount: 4, login: 'pepe', timestamp: 1529914343926 }
