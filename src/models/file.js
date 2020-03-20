let mongoose = require('mongoose')
let FileSchema = require('../schemas/file')
let File = mongoose.model('files', FileSchema)

module.exports = File
