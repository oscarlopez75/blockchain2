var express = require('express');
var checkToken = require('../modules/auth');
var sendInfo = require('../modules/addBlock');

var router = express.Router();

router.get('/', function(req, res){
  res.json({message:"Welcome to the blockchain practice"});
});


router.post('/newBlock', (req, res, next) => {
  if( req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization') ){
    checkToken.checkToken(req.headers['authorization'], function(mess, resp){
      if(resp){
        data = req.body;
        amount = data.amount;
        login = mess.login;
        timestamp = new Date().getTime();
        info = {amount: amount, login: login, timestamp: timestamp};
        sendInfo.getInfo(info, function(err, message){
          if(err){
            res.status(500).json({
              message: message
            });
          }else{
            res.status(200).json({
              message: message
            });
          }
        });        
      }else{
        res.status(401).json({message: mess});
      }
    });
  }else{
    res.json({message:'No token sorry'});
  }

});


module.exports = router;
