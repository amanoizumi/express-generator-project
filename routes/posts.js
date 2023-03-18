const express = require('express');
const router = express.Router();
const postControllers = require('../controllers/posts');

router.get('/', (req, res) => {
  postControllers.getPosts(req, res);
});
router.post('/', (req, res) => {
  postControllers.createPosts(req, res);
});
router.delete('/', (req, res) => {
  postControllers.deleteAllPosts(req, res);
});
router.delete('/:id', (req, res) => {
  postControllers.deletePostByID(req, res);
});
router.patch('/:id', (req, res) => {
  postControllers.editOnePost(req, res);
});

module.exports = router;
