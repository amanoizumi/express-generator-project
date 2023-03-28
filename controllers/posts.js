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
      const { body } = req;
      if (body.name && body.content) {
        const postCreate = await Post.create(body);
        handleSuccess(res, postCreate);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  async deleteAllPosts(req, res) {
    try {
      const delAllPosts = await Post.deleteMany({});
      handleSuccess(res, delAllPosts);
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePostByID(req, res) {
    try {
      const { id } = req.params;
      const delOnePost = await Post.findByIdAndDelete(id);
      handleSuccess(res, delOnePost);
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
        // 加入第三個參數 { new: true, } 可以回傳新的貼文
        const editPost = await Post.findByIdAndUpdate(id, editContent, { new: true, });
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
