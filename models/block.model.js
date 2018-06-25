const mongoose = require('mongoose');

const BlockSchema = mongoose.Schema({
  index: {
    type: Number,
    required: true,
    unique: true
  },
  timestamp: {
    type: Number,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
  previousHash: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  }
});




module.exports = mongoose.model('Block', BlockSchema);
