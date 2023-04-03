const User = require('../models/UsersModel');
const Post = require('../models/PostsModel');

const handleSuccess = require('../service/handleSuccess');
const handleErrorAsync = require('../service/handleErrorAsync');
const appError = require('../service/appError');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const { generateSendJWT } = require('../service/auth');

const signUp = handleErrorAsync(async (req, res, next) => {
  let { email, password, confirmPassword, name } = req.body;

  // 驗證
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
  password = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    email,
    password,
    name,
    createdAt: new Date().getTime(),
  });

  generateSendJWT(newUser, 201, res);
});

const signIn = handleErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(appError(400, '帳號或密碼不可為空', next));
  }
  const user = await User.findOne({ email }).select('+password');

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) {
    return next(appError(400, '您輸入的密碼不正確', next));
  }
  generateSendJWT(user, 200, res);
});

const getProfile = handleErrorAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id).select('+email photo name');
  handleSuccess(res, user);
});

const updatePassword = handleErrorAsync(async (req, res, next) => {
  const { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(appError('400', '密碼不一致！', next));
  }

  newPassword = await bcrypt.hash(password, 12);
  const user = await User.findByIdAndUpdate(req.user.id, {
    password: newPassword,
  });
  generateSendJWT(user, 200, res);
});

module.exports = {
  signUp,
  signIn,
  getProfile,
  updatePassword,
};
