const express = require('express');
const router = express.Router();

const { isAuth } = require('../service/auth');

const postControllers = require('../controllers/posts');

router.get('/', postControllers.getPosts);
router.post('/', isAuth, postControllers.createPosts);
router.delete('/', isAuth, postControllers.deleteAllPosts);
router.delete('/:id', isAuth, postControllers.deletePostByID);
router.patch('/:id', isAuth, postControllers.editOnePost);

router.post('/:id/comment', isAuth, postControllers.createComment);

module.exports = router;
