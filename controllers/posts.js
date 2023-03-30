const Post = require('../models/PostsModel.js');

// const handleErrorAsync = require('../utils/handleErrorAsync');
// const AppError = require('./../utils/appError');

const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');

const posts = {
  async getPosts(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '取得全部貼文 API'
     * #swagger.parameters['timeSort'] = {
          description: '貼文排序：asc 由舊到新；desc 由新到舊',
          type: 'string',
        } 
     * #swagger.responses[200] = {
          description: '貼文資訊',
          schema: { $ref: "#/definitions/getPosts" }
          }
     */

    // asc 遞增(由小到大，由舊到新) createdAt ;
    // desc 遞減(由大到小、由新到舊) "-createdAt"

    // 預設為由新到舊
    const timeSort = req.query.timeSort === 'asc' ? 'createdAt' : '-createdAt';
    const q = req.query.q !== undefined ? { content: new RegExp(req.query.q) } : {};

    // const post = await Post.find(q)
    //   .populate({
    //     path: 'user',
    //     select: 'name photo',
    //   })
    //   .sort(timeSort);

    const post = await Post.find(q).sort(timeSort);

    handleSuccess(res, post);
  },

  async createPosts(req, res) {
    // 錢字號是代表必填
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.description = '新增貼文 API'
     * #swagger.parameters['body'] = {
        in: 'body',
        type: 'object',
        required: true,
        description: '資料格式',
        schema: {
          $name: '貼文姓名',
          $tags: '標籤',
          $type: 'group',
          $content: '這是一段話'
        }
      }
     * #swagger.responses[200] = {
          description: '貼文資訊',
          schema: {
              "status": true,
              "data": [
                {
                  "_id": "6415c6fc61f32ff37f889238",
                  "content": "這是一段話",
                  "type": "group",
                  "image": "",
                  "name": "貼文姓名",
                  "likes": 0,
                  "comments": 0,
                  "tags": '標籤'
                }
              ]
            }
          }
     */
          handleErrorAsync(async(req, res, next))
    try {
      const { body } = req;
      if (body.name && body.content) {
        body.createdAt = new Date().getTime();
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
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.security = [{
        apiKeyAuth: []
      }]
     */
    try {
      const delAllPosts = await Post.deleteMany({});
      handleSuccess(res, delAllPosts);
    } catch (err) {
      handleError(res, err);
    }
  },
  async deletePostByID(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.parameters['id'] = {
          description: '貼文 ID',
          type: 'string',
          in: 'path',
          require: true
        }
     */
    try {
      const { id } = req.params;
      const delOnePost = await Post.findByIdAndDelete(id);
      handleSuccess(res, delOnePost);
    } catch (err) {
      handleError(res, err);
    }
  },
  async editOnePost(req, res) {
    /**
     * #swagger.tags = ['Posts - 貼文']
     */
    try {
      const { id } = req.params;
      const { body } = req;

      if (body.content !== undefined) {
        const editContent = {
          content: body.content,
        };
        // 加入第三個參數 { new: true, } 可以回傳新的貼文
        const editPost = await Post.findByIdAndUpdate(id, editContent, { new: true });
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
