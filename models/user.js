let mongoose = require('mongoose')
let UserSchema = require('../schemas/user')
let User = mongoose.model('users', UserSchema)

module.exports = User
