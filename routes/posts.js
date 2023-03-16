const express = require('express');
const router = express.Router();

const Post = require('../models/PostsModel');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const post = await Post.find();
  res.status(200).json(post);
});

router.post('/', async (req, res, next) => {
  // 框架不需要使用 chunk，可直接取得 body 資料
 const data = req.body;
  const newPost = await Post.create({
    name: data.name,
    content: data.content,
    tags: data.tags,
    type: data.type,
  });

  res.status(200).json(newPost);
});

module.exports = router;
