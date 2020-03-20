let mongoose = require('mongoose')
//用于md5加密
let bcrypt = require('bcryptjs')
//加盐数
let SALT_WORK_FACTOR = 10
let UserSchema = new mongoose.Schema({
  username: {
    unique: true,
    type: String
  },
  type: {
    type: String,
    default: 'user'
  },
  avatar: String,
  password: String,
  mail: String,
  phone: String,
  birth: String,
  gender: String,
  point: Number,
  exp: Number,
  desc: String,
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
//对密码进行加密
UserSchema.pre('save', function (next) {
  let user = this
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now()
  }
  else {
    this.updateAt = Date.now()
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)

      user.password = hash
      next()
    })
  })
})
//用于比较密码是否正确
UserSchema.methods = {
  comparePassword: function (_password, cb) {
    bcrypt.compare(_password, this.password, function (err, isMatch) {
      if (err) return cb(err)
      cb(null, isMatch)
    })
  }
}

UserSchema.statics = {
  fetch: function (cb) {
    return this
      .find({})
      .sort('meta.updateAt')
      .exec(cb)
  },
  findById: function (id, cb) {
    return this
      .findOne({_id: id})
      .exec(cb)
  }
}

module.exports = UserSchema
