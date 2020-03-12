const models = require('./db')
// const jwt = require('jsonwebtoken')
// const secret = 'candice'


module.exports = app => {
  app.post('/api/user/register', (req, res) => {
    models.Login.find({username: req.body.username}, (err, data) => {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      } else {
        console.log('查询成功' + data)
        if (data.length > 0) {
          res.send({'status': 1001, 'message': '该用户名已注册!'})
        } else {
          let newName = new models.Login({
            username: req.body.username,
            password: req.body.password,
            mail: req.body.mail,
            phone: req.body.phone,
            birth: req.body.birth,
            gender: req.body.gender,
            desc: req.body.desc
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
    models.Register.findOne({username: username}, function (err, user) {
      if (err) {
        res.send({'status': 1002, 'message': '查询失败', 'data': err})
      }
      console.log(user)
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
              res.send({'status': 1000, 'message': '登录成功', 'data': err})
            } else {
              res.send({'status': 1005, 'message': '密码错误', 'data': err})
              console.log('password is not matched');
            }
          })
        } else {
          res.send({'status': 1002, 'message': '登录失败', 'data': err})
        }
      }
    })
  })

}
