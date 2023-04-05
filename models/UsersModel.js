const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入您的名字'],
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, '請輸入您的 Email'],
      unique: true,
      lowercase: true,
      select: false,
    },
    password: {
      type: String,
      required: [true, '請輸入密碼'],
      minlength: 8,
      select: false,
    },
    photo: {
      default: 'https://fakeimg.pl/200x200/?text=No%20Avatar',
      type: String,
    },
    createdAt: {
      type: Number,
      default: Date.now(),
      select: false,
    },
  },
  { versionKey: false, collection: 'user' }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
