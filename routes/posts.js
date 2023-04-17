const express = require('express');
const router = express.Router();

const { isAuth } = require('../service/auth');

const postControllers = require('../controllers/posts');

router.get('/', postControllers.getPosts);
router.get('/:id', postControllers.getPostByID);

router.post('/', isAuth, postControllers.createPosts);
router.delete('/', postControllers.deleteAllPosts);
router.delete('/:id', isAuth, postControllers.deletePostByID);
router.patch('/:id', isAuth, postControllers.editOnePost);

router.post('/:id/comments', isAuth, postControllers.createComment);

module.exports = router;
