let mongoose = require('mongoose')

let BlockSchema = new mongoose.Schema({
  blockName: String,
  moderator: Array,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
});

module.exports = BlockSchema
