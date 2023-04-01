const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users');


router.post('/sign_up', usersControllers.signUp);

module.exports = router;
