let mongoose = require('mongoose')

let AnnouncementSchema = new mongoose.Schema({
  content: String,
  createDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = AnnouncementSchema
