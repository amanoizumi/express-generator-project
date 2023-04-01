const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// 自動加入 headers 跨網域
const cors = require('cors');



const swaggerUI = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

// 載入路由檔案
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const uploadRouter = require('./routes/upload');

process.on('uncaughtException', err => {
  // 記錄錯誤下來，等到服務都處理完後，停掉該 process
	console.error('Uncaughted Exception！')
	console.error(err);
	process.exit(1);
});

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
// app.use('/api/upload', uploadRouter);

app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerFile));

// 404
app.use((req, res, next) => {
  res.status(404).send({
    status: 'error',
    message: '無此路由資訊',
  });
});

// express 錯誤處理
app.use((err, req, res, next) => {
  res.status(500).send({
    err: err.message,
  });
});



// 未捕捉到的 catch
process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
  // 記錄於 log 上
});



module.exports = app;
