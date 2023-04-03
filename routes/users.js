const express = require('express');
const router = express.Router();

const { isAuth } = require('../service/auth');

const usersControllers = require('../controllers/users');

router.post('/sign_up', usersControllers.signUp);
router.post('/sign_in', usersControllers.signIn);

router.get('/profile', isAuth, usersControllers.getProfile);
router.get('/updatePassword', isAuth, usersControllers.updatePassword);

module.exports = router;
