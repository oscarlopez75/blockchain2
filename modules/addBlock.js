var connect    = require('./dbConnect');
var Blocks     = require('../models/block.model');
const mongoose = require('mongoose');
var blockchain = require('./blockchain');
var dataFull = {};

var getInfo = (data, callback) =>{
  Blocks.find()
    .exec()
    .then(function(blocks){
      if(blocks.length == 0){
        //addGenesis(blockchain.block(true, dataFull), function(err){
        addGenesis(data)
          .then(function () {
            callback(false, "Genesis Block added");
          })
          .catch(function(err) {
            callback(true, err);
          });
      }else{
        addNew(data)
          .then(function(){
            callback(false, "New Block added");
          })
          .catch(function(err){
            callback(true, err);
          });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
}

function addGenesis(data){
  return new Promise((resolve, reject) => {
    // data = { amount: 4, login: 'pepe', timestamp: 1529938235811 }
    blockchain.block(true, data)
      .then(function(object){
        addRecord(object)
          .then(function(){
            resolve();
          })
          .catch(function(err){
            reject(err);
          });
      })
      .catch(function(err){
        console.log(err);
        reject(err);
      });
  });
}

var addNew = (data) => {
  return new Promise((resolve, reject) => {
    //{ amount: 20, login: 'pepe', timestamp: 1529940598471 }
    blockchain.block(false, data)
      .then(function(object){
        addRecord(object)
          .then(function(){
            resolve();
          })
          .catch(function(err){
            reject(err);
          });
      })
      .catch(function(err){
        console.log(err);
        reject(err);
      });
  });

}


var addRecord = (object) => {
  return new Promise((resolve, reject) => {
    const genBlock = new Blocks({
      index: object.index,
      timestamp: object.timestamp,
      data: object.data,
      previousHash: object.previousHash,
      hash: object.hash
    });
    genBlock.save()
      .then(result => {
        console.log("record created");
        resolve();
      })
      .catch(err =>{
        console.log(err);
        reject(err);
      });
  });

}

//info = {amount: amount, login: login, timestamp: timestamp};

module.exports.getInfo = getInfo;
