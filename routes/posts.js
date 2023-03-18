const express = require('express');
const router = express.Router();
const PostControllers = require('../controllers/posts');

router.get('/', (req, res) => {
  PostControllers.getPosts(req, res);
});
router.post('/', (req, res) => {
  PostControllers.createPosts(req, res);
});
router.delete('/', (req, res) => {
  PostControllers.deleteAllPosts(req, res);
});
router.delete('/:id', (req, res) => {
  PostControllers.deletePostByID(req, res);
});
router.patch('/:id', (req, res) => {
  PostControllers.editOnePost(req, res);
});

module.exports = router;
