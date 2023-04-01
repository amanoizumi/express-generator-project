const User = require('../models/UsersModel');
const Post = require('../models/PostsModel');

const handleErrorAsync = require('../service/handleErrorAsync');
const appError = require('../service/appError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { isAuth, generateSendJWT } = require('../service/auth');

const signUp = handleErrorAsync(async (req, res, next) => {
  let { email, password, confirmPassword, name } = req.body;
  if (!email || !password || !confirmPassword || !name) {
    return next(appError('400', '欄位未填寫正確！', next));
  }
  if (password !== confirmPassword) {
    return next(appError('400', '密碼不一致！', next));
  }
  if (!validator.isLength(password, { min: 8 })) {
    return next(appError('400', '密碼字數低於 8 碼', next));
  }
  if (!validator.isEmail(email)) {
    return next(appError('400', 'Email 格式不正確', next));
  }

  // 加密密碼
  password = await bcrypt.hash(req.body.password, 12);

  
  const newUser = await User.create({
    email,
    password,
    name,
    createdAt: new Date().getTime(),
  });

  generateSendJWT(newUser, 201, res);
});

module.exports = {
  signUp,
};
