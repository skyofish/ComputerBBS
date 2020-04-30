let mongoose = require('mongoose')
let MessageSchema = require('../schemas/message')
let Message = mongoose.model('messages', MessageSchema)

module.exports = Message
