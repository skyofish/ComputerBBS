let mongoose = require('mongoose')
let AnnouncementSchema = require('../schemas/announcement')
let Announcement = mongoose.model('announcements', AnnouncementSchema)

module.exports = Announcement
