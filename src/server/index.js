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








