let mongoose = require('mongoose')
let ArticleSchema = require('../schemas/article')
let Article = mongoose.model('articles', ArticleSchema)

module.exports = Article
