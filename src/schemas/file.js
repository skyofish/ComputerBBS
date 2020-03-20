let mongoose = require('mongoose')

let FileSchema = new mongoose.Schema({
  title: String,
  file:Array,
  author: String,
  score: Number,
  upLoadDate: {
    type: Date,
    default: Date.now()
  },
  like: {
    type: Number,
    default: 0
  },
  download: {
    type: Number,
    default: 0
  }
});

module.exports = FileSchema
