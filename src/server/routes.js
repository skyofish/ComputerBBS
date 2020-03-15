const models = require('./db')
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
            point: 0,
            exp: 0
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
      username: req.body.username,
      title: req.body.title,
      content: req.body.content,
      block: req.body.block
    })
    newArticle.save((err, data) => {
      if (err) {
        res.send({'status': 1002, 'message': '发布失败!', 'data': err})
      } else {
        res.send({'status': 1000, 'message': '发布成功!'});
      }
    })
  })
}
