let mongoose = require('mongoose')
let BlockSchema = require('../schemas/block')
let Block = mongoose.model('blocks', BlockSchema)

module.exports = Block
