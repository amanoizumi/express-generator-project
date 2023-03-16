const express = require('express');
const router = express.Router();
const PostControllers = require('../controllers/posts');

router.get('/', PostControllers.getPosts);
router.post('/', PostControllers.createPosts);

module.exports = router;
