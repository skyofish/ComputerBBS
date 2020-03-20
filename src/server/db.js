const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://127.0.0.1:27017/skyofish', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', (error) => console.log('Mongo connection error' + error));
db.once('open', () => console.log('Mongo connection successed'))

const user = require('../models/user')
const article = require('../models/article')
const block = require('../models/block')
const file = require('../models/file')
const announcement = require('../models/announcement')


const Models = {
  User: user,
  Article: article,
  Block: block,
  File: file,
  Announcement: announcement
}

module.exports = Models
