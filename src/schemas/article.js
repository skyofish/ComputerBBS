let mongoose = require('mongoose')

let ArticleSchema = new mongoose.Schema({
  title: String,
  author: String,
  isCheck: {
    type: Boolean,
    default: false
  },
  isTop: {
    type: Boolean,
    default: false
  },
  block: String,
  content: String,
  score: Number,
  like: Number,
  images: Array,
  isElite: {
    type: Boolean,
    default: false
  },
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
