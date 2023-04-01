const User = require('../models/UsersModel');
const Post = require('../models/PostsModel');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const { isAuth, generateSendJWT } = require('../service/auth');

const users = {
  async signUp(req, res) {
    const { body } = req;
  },
};

module.exports = users;
