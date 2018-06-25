let mongoose = require('mongoose');

const server = process.env.DB_USER + ':' + process.env.DB_PASS + '@ds161610.mlab.com:61610'; // DB SERVER

const database = 'test_blockchain'; // YOUR DB NAME


class Database {
  constructor() {
    this._connect()
  }



  _connect() {
     mongoose.connect("mongodb://" + server + "/" + database)
       .then(() => {
         console.log('Connection to ' + database +  ' successful')
       })
       .catch(err => {
         console.error(err);
       })
  }

}

var checkCon = function(callback) {
  callback(mongoose.connection.readyState);
};

module.exports = new Database()
module.exports.checkCon = checkCon;
