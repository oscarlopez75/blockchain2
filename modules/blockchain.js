var blockMod = require('./block');
const calHash = require('./calHash');
var Blocks     = require('../models/block.model');

/*
var block = (empty, data)=>{
  if(empty){
    return new blockMod.Block(0, data.timestamp, 'Genesis Block', '0');
  }else{
    Blocks.find({}, null, {sort: '-date'}, function(err, docs){
      if(err){
        console.log(err);
        return;
      }else{
        lastIndex = docs[docs.length - 1].index;
        previousHash = docs[docs.length - 1].hash;
        console.log(lastIndex);
        console.log(previousHash);
        return new blockMod.Block(lastIndex + 1, data.timestamp, {amount: data.amount, login: data.login}, previousHash);
      }
    });
  }
};

*/
// data = { amount: 4, login: 'pepe', timestamp: 1529938235811 }
var block = function (empty, data){
  return new Promise(function(resolve, reject){
    if(empty){
      resolve(new blockMod.Block(0, data.timestamp, {amount: data.amount, login: data.login}, '0'));
    }else{
      Blocks.find({}, null, {sort: '-date'}, function(err, docs){
        if(err){
          console.log(err);
          reject(err);
        }else{
          lastIndex = docs[docs.length - 1].index;
          previousHash = docs[docs.length - 1].hash;
          console.log(lastIndex);
          console.log(previousHash);
          resolve(new blockMod.Block(lastIndex + 1, data.timestamp, {amount: data.amount, login: data.login}, previousHash));
        }
      });
    }
  });
}


module.exports.block = block;

//{ amount: 4, login: 'pepe', timestamp: 1529914343926 }
