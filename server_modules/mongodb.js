const mongoose = require('mongoose')
const config = require('../config/config')

// bluebird用于异步回调
mongoose.Promise = require('bluebird')
global.db = mongoose.connect(`mongodb://${config.db.servername}:${config.db.port}/${config.db.DATABASE}`,{useNewUrlParser: true, useUnifiedTopology: true})

module.exports = mongoose;
