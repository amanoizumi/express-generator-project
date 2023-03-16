const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 自動加入 headers 跨網域
const cors = require('cors')

// 載入路由檔案
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

require('./connections');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用路由
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

module.exports = app;
