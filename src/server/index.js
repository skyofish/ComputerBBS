//操作文件，读写文件
const fs = require('fs');
const path = require('path');
//解析前端发送来的数据
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require('../server/routes')(app)

let server = app.listen(8081);
console.log('success listen 8081');
const io = require('socket.io')(server)
let Message = require('../models/message')
let users = []
let username
let roomId
io.on('connection', function (socket, roomId) {
  //监听用户发布聊天内容
  socket.on('join', function(data){
    username = data.username;
    roomId = data.roomId
    users.push(username)
    socket.join(data.roomId);
    io.to(roomId).emit('joined', data, users);
  });
  socket.on('message', function (obj) {
    //向所有客户端广播发布的消息
    io.to(roomId).emit('message', obj)
    let mess = {
      username: obj.username,
      src:obj.src,
      msg: obj.msg,
      roomid:roomId
    }
    let message = new Message(mess)
    //将发送过来的消息进行储存
    message.save(function (err, mess) {
      if (err) {
        console.log(err)
      }
      console.log(mess)
    })
    console.log(obj.username + '说：' + obj.msg)
  })
  socket.on('login',function (obj) {
    users[obj.name] = obj
    //用于监听用户进行聊天室
    io.to(roomId).emit('login', users)
  })
  socket.on('logout',function (name) {
    users.splice(users.indexOf(name), 1)
    //用户监听用退出聊天室
    console.log(users)
    io.to(roomId).emit('logout', users)
  })
})







