let mongoose = require('mongoose')

let BlockSchema = new mongoose.Schema({
  blockName: String,
  moderator: Array,
});

module.exports = BlockSchema
