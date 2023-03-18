const Post = require('../models/PostsModel.js');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const posts = {
  async getPosts(req, res) {
    const allPosts = await Post.find();
    handleSuccess(res, allPosts);
  },

  async createPosts(req, res) {
    try {
      const data = req.body;
      if (data.name && data.content) {
        const info = await Post.create(data);
        handleSuccess(res, info);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async deleteAllPosts(req, res) {
    const posts = await Post.deleteMany({});
    handleSuccess(res, posts);
  },
  async deletePostByID(req, res) {
    try {
      const { id } = req.params;
      const info = await Post.findByIdAndDelete(id);
      if (info === null) {
        handleError(res);
      } else {
        handleSuccess(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async editOnePost(req, res) {
    try {
      const { id } = req.params;
      const { body } = req;

      if (body.content !== undefined) {
        const editContent = {
          content: body.content,
        };
        const editPost = await Post.findByIdAndUpdate(id, editContent);
        handleSuccess(res, editPost);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
};

module.exports = posts;
