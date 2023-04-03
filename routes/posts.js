const express = require('express');
const router = express.Router();

const { isAuth } = require('../service/auth');

const postControllers = require('../controllers/posts');

router.get('/', postControllers.getPosts);
router.post('/', postControllers.createPosts);
router.delete('/', postControllers.deleteAllPosts);
router.delete('/:id', postControllers.deletePostByID);
router.patch('/:id', postControllers.editOnePost);

module.exports = router;
