let mongoose = require('mongoose')

let ArticleSchema = new mongoose.Schema({
  title: String,
  block: String,
  content: String,
  score: Number,
  isElite: Boolean,
  comment: [
    {
      username: String,
      comment: String,
      replyDate: {
        type: Date,
        default: Date.now()
      },
      replyUsername: String
    }
  ],
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

module.exports = ArticleSchema
