const models = require('./db')
let multiparty = require('multiparty')
let bcrypt = require('bcryptjs')
var http = require('http');
//加盐数
let SALT_WORK_FACTOR = 10
let fs = require('fs')
// const jwt = require('jsonwebtoken')
// const secret = 'candice'


module.exports = app => {
  app.post('/api/user/register', (req, res) => {
    models.User.find({username: req.body.username}, (err, data) => {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      } else {
        console.log('查询成功' + data)
        if (data.length > 0) {
          res.send({'status': 1001, 'message': '该用户名已注册!'})
        } else {
          let newName = new models.User({
            username: req.body.username,
            password: req.body.password,
            mail: req.body.mail,
            phone: req.body.phone,
            birth: req.body.birth,
            gender: req.body.gender,
            desc: req.body.desc,
            avatar: req.body.avatar,
            point: 0,
            exp: 0,
          })
          newName.save((err, data) => {
            if (err) {
              res.send({'status': 1002, 'message': '注册失败!', 'data': err})
            } else {
              res.send({'status': 1000, 'message': '注册成功!'});
            }
          })
        }
      }
    })
  })

  app.post('/api/user/login', (req, res) => {
    console.log(req.body)
    let _user = req.body
    let username = _user.username
    let password = _user.password
    console.log(password)
    models.User.findOne({username: username}, function (err, user) {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      }
      if (!user) {
        res.send({'status': 1004, 'message': '该用户不存在'})
      } else {
        if (!!password) {
          user.comparePassword(password, function (err, isMatch) {
            if (err) {
              res.send({'status': 1002, 'message': '查询失败', 'data': err})
            }
            if (isMatch) {
              console.log('success');
              res.send({'status': 1000, 'message': '登录成功', 'data': user})
            } else {
              res.send({'status': 1005, 'message': '密码错误', 'data': err})
            }
          })
        } else {
          res.send({'status': 1002, 'message': '登录失败', 'data': err})
        }
      }
    })
  })

  app.post('/api/article/post', (req, res) => {
    let newArticle = new models.Article({
      author: req.body.author,
      title: req.body.title,
      content: req.body.content,
      block: req.body.block,
      images: req.body.images,
      like: 0,
    })
    newArticle.save((err, data) => {
      if (err) {
        res.send({'status': 1002, 'message': '发布失败!', 'data': err})
      } else {
        res.send({'status': 1000, 'message': '发布成功!'});
      }
    })
  })

  app.post('/api/upload/image', (req, res) => {
    let form = new multiparty.Form();
    let route
    form.uploadDir = "../../static";
    form.parse(req, function (err, fields, files) {
      if (err) {
        throw err;
      } else {
        //同步重命名文件名
        route = '/static/' + files.file[0].originalFilename
        fs.renameSync(files.file[0].path, "../../static/" + files.file[0].originalFilename);
        res.send({'status': 1000, 'message': '上传成功!', 'data': route})
      }
    })
  })

  app.post('/api/user/update', (req, res) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        let password = hash
        models.User.updateOne({_id: req.body._id},
          {$set: {
              username: req.body.username,
              password: password,
              mail: req.body.mail,
              phone: req.body.phone,
              birth: req.body.birth,
              gender: req.body.gender,
              desc: req.body.desc
            }},
          function (err, result) {
            models.User.findOne({_id: req.body._id}, function (err, user) {
              res.send({'status': 1000, 'message': '修改成功', 'data': user})
            })
          }
        )
      })
    })
  })

  app.get('/api/blockList', (req, res) => {
    models.Block.find(function (err, list) {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      }
      if (!list) {
        res.send({'status': 1004, 'message': '未查找到版块'})
      } else {
        res.send({'status': 1000, 'message': '查询成功', 'data': list})
      }
    })
  })

  app.post('/api/article/list', (req, res) => {
    if (req.body.blockName) {
      models.Article.find({block: req.body.blockName, isCheck: true}).countDocuments(function(error, count) {
        if (error) {
          console.log(error)
        } else {
          models.Article.find({block:req.body.blockName}, function (err, list) {
            if (err) {
              res.send({'status': 1002, 'message': '查询失败', 'data': err})
            } else {
              if(list.length == 0) {
                res.send({'status': 1004, 'message': '未查询到任何文章'})
              } else {
                res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
              }
            }
          }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
        }
      })
    } else if (req.body.operate == 'hot') {
      models.Article.find({isCheck: true}, function (err, list) {
        if (err) {
          res.send({'status': 1002, 'message': '查询失败', 'data': err})
        } else {
          if(list.length == 0) {
            res.send({'status': 1004, 'message': '未查询到任何文章'})
          } else {
            res.send({'status': 1000, 'message': '查询成功', 'data': list})
          }
        }
      }).sort({"like":-1}).limit(10)
    } else if (req.body.user == 'admin' && req.body.operate == 'manage') {
      models.Article.find({isCheck: true}).countDocuments(function(error, count) {
        if (error) {
          console.log(error)
        } else {
          models.Article.find({isCheck: true}, function (err, list) {
            if (err) {
              res.send({'status': 1002, 'message': '查询失败', 'data': err})
            } else {
              if(list.length == 0) {
                res.send({'status': 1004, 'message': '未查询到任何文章'})
              } else {
                res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
              }
            }
          }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
        }
      })
    } else if (req.body.user == 'moderator' && req.body.operate == 'manage') {
      models.Block.find({moderator:{$elemMatch:{$eq:req.body.username}}}, function (err1, list1) {
        if (err1) {
          res.send({'status': 1002, 'message': '查询失败', 'data': err})
        }
        if (list1.length == 0) {
          res.send({'status': 1004, 'message': '未查找到版块'})
        } else {
          models.Article.find({isCheck: true, block: list1.blockName}).countDocuments(function(error, count) {
            if (error) {
              console.log(error)
            } else {
              models.Article.find({isCheck: true, block: list1.blockName}, function (err, list) {
                if (err) {
                  res.send({'status': 1002, 'message': '查询失败', 'data': err})
                } else {
                  if(list.length == 0) {
                    res.send({'status': 1004, 'message': '未查询到任何文章'})
                  } else {
                    res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
                  }
                }
              }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
            }
          })
        }
      })
    } else if (req.body.user == 'admin' && req.body.operate == 'check') {
      models.Article.find({isCheck: false}).countDocuments(function(error, count) {
        if (error) {
          console.log(error)
        } else {
          models.Article.find({isCheck: false}, function (err, list) {
            if (err) {
              res.send({'status': 1002, 'message': '查询失败', 'data': err})
            } else {
              if(list.length == 0) {
                res.send({'status': 1004, 'message': '未查询到任何文章'})
              } else {
                res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
              }
            }
          }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
        }
      })
    } else if (req.body.user == 'moderator' && req.body.operate == 'check') {
      models.Block.find({moderator:{$elemMatch:{$eq:req.body.username}}}, function (err1, list1) {
        if (err1) {
          res.send({'status': 1002, 'message': '查询失败', 'data': err})
        }
        if (list1.length == 0) {
          res.send({'status': 1004, 'message': '未查找到版块'})
        } else {
          models.Article.find({isCheck: false, block: list1.blockName}).countDocuments(function(error, count) {
            if (error) {
              console.log(error)
            } else {
              models.Article.find({isCheck: false, block: list1.blockName}, function (err, list) {
                if (err) {
                  res.send({'status': 1002, 'message': '查询失败', 'data': err})
                } else {
                  if(list.length == 0) {
                    res.send({'status': 1004, 'message': '未查询到任何文章'})
                  } else {
                    res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
                  }
                }
              }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
            }
          })
        }
      })
    }
  })

  app.post('/api/article/detail', (req, res) => {
    models.Article.findOne({_id: req.body.articleId}, function (err, rs) {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      } else {
        res.send({'status': 1000, 'message': '查询成功', 'data': rs})
      }
    })
  })

  app.post('/api/article/comment', (req, res) => {
    models.Article.updateOne({_id: req.body.articleId},{$push: {'comment': {
      username: req.body.username,
      replyUsername: req.body.replyUsername,
      comment: req.body.comment,
      replyDate: req.body.replyDate
    }}}, function (err, rs) {
      if (err) {
        res.send({'status': 1004, 'message': '插入失败', 'data': err})
      } else {
        res.send({'status': 1000, 'message': '评论成功', 'data': rs})
      }
    })
  })

  app.post('/api/file/upload', (req, res) => {
    let newFile = new models.File({
      title: req.body.title,
      author: req.body.author,
      file: req.body.file,
      score: req.body.score
    })
    newFile.save((err, data) => {
      if (err) {
        res.send({'status': 1002, 'message': '上传失败!', 'data': err})
      } else {
        models.User.updateOne({_id: req.body.id}, {$inc:{ point: 20, exp: 10}}, function (err, rs) {
          res.send({'status': 1000, 'message': '上传成功!'});
        })
      }
    })
  })

  app.post('/api/file/list', (req, res) => {
    models.File.find({}).countDocuments(function (error, count) {
      if (error) {
        res.send({'status': 1002, 'message': '查询失败', 'data': error})
      } else {
        models.File.find(function (err, list) {
          if (err) {
            res.send({'status': 1002, 'message': '查询失败', 'data': err})
          }
          if (list.length == 0) {
            res.send({'status': 1004, 'message': '未查找到版块'})
          } else {
            res.send({'status': 1000, 'message': '查询成功', 'data': list, 'count': count})
          }
        }).skip((req.body.current-1)*req.body.pageSize).limit(req.body.pageSize)
      }
    })
  })

  app.post('/api/file/download', (req, res) => {
    models.User.updateOne({_id: req.body.id}, {$inc:{ point: -req.body.score}}, function (err1, rs1) {
      models.File.updateOne({_id: req.body.fileId}, {$inc:{ download: 1 }}, function (err2, rs2) {
        res.send({'status': 1000, 'message': '上传成功!'});
      })
    })
  })

  app.post('/api/like', (req, res) => {
    if (req.body.articleId) {
      models.Article.updateOne({_id: req.body.articleId}, {$inc:{ like: 1 }}, function (err, rs) {
        res.send({'status': 1000, 'message': '点赞成功!'});
      })
    } else {
      models.File.updateOne({_id: req.body.fileId}, {$inc:{ like: 1 }}, function (err, rs) {
        res.send({'status': 1000, 'message': '点赞成功!'});
      })
    }
  })

  app.post('/api/makeAnnouncement', (req, res) => {

  })

  app.get('/api/getAnnouncement', (req, res) => {

  })

  app.post('/api/article/elite', (req, res) => {

  })

  app.post('/api/article/top', (req, res) => {

  })

  app.post('/api/article/remove', (req, res) => {

  })

  app.post('/api/article/check', (req, res) => {

  })

  app.post('/api/user/list', (req, res) => {

  })

  app.post('/api/user/lock', (req, res) => {

  })

  app.post('/api/user/moderatorSuccess', (req, res) => {

  })

  app.post('/api/user/moderatorFail', (req, res) => {

  })
}
