const Posts = require('../models/PostsModel.js');
const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const posts = {
  async getPosts({ req, res }) {
    const allPosts = await Posts.find();
    handleSuccess(res, allPosts);
  },

  async createPosts({ req, res }) {
    try {
      const { body } = req;
      console.log(req);
      if (body.content) {
        const newPost = await Posts.create({
          name: body.name,
          content: body.content,
          tags: body.tags,
          type: body.type,
        });
        handleSuccess(res, newPost);
      } else {
        handleError(res);
      }
    } catch (err) {
      handleError(res, err);
    }
  },
  // async deleteAllPosts({ req, res }) {
  //   const posts = await Posts.deleteMany({});
  //   handleSuccess(res, posts);
  // },
  // async deleteOnePost({ id, req, res }) {
  //   try {
  //     await Posts.findByIdAndDelete(id);
  //     handleSuccess(res, null);
  //   } catch (err) {
  //     handleError(res, err);
  //   }
  // },
  // async editOnePost({ id, body, req, res }) {
  //   try {
  //     const data = JSON.parse(body);
  //     if (data.content !== undefined) {
  //       const editContent = {
  //         content: data.content,
  //       };
  //       const editPost = await Posts.findByIdAndUpdate(id, editContent);
  //       handleSuccess(res, editPost);
  //     } else {
  //       handleError(res);
  //     }
  //   } catch (err) {
  //     handleError(res, err);
  //   }
  // },
};

module.exports = posts;
