const Post = require('../models/PostsModel');
const Comment = require('../models/CommentsModel');

const handleErrorAsync = require('../service/handleErrorAsync');
const handleSuccess = require('../service/handleSuccess');

const getPosts = handleErrorAsync(async (req, res) => {
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

  // 取出關連的資料，user 以及 comment 資訊
  const post = await Post.find(q)
    .populate({
      path: 'user',
      select: 'name photo',
    })
    .populate({
      path: 'comment',
      select: 'comment user createdAt',
    })
    .sort(timeSort);
  handleSuccess(res, post);
});
// 取得單一貼文資料
const getPostByID = handleErrorAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id)
    .populate({
      path: 'user',
      select: 'name photo',
    })
    .populate({
      path: 'comment',
      select: 'comment user createdAt',
    });

  handleSuccess(res, post);
});

const createPosts = handleErrorAsync(async (req, res) => {
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

  const { content } = req.body;
  if (content == undefined) {
    return next(appError(400, '你沒有填寫 content 資料', next));
  }

  const createdAt = new Date().getTime();
  const postCreate = await Post.create({
    user: req.user.id,
    content,
    createdAt,
  });
  handleSuccess(res, postCreate);
});

const deleteAllPosts = handleErrorAsync(async (req, res) => {
  /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.security = [{
        apiKeyAuth: []
      }]
     */

  const delAllPosts = await Post.deleteMany({});
  handleSuccess(res, delAllPosts);
});

const deletePostByID = handleErrorAsync(async (req, res) => {
  /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.parameters['id'] = {
          description: '貼文 ID',
          type: 'string',
          in: 'path',
          require: true
        }
     */

  const { id } = req.params;
  const delOnePost = await Post.findByIdAndDelete(id);
  handleSuccess(res, delOnePost);
});

const editOnePost = handleErrorAsync(async (req, res) => {
  /**
     * #swagger.tags = ['Posts - 貼文']
     * #swagger.parameters['id'] = {
          description: '貼文 ID',
          type: 'string',
          in: 'path',
          require: true
        }
     */

  const { id } = req.params;
  const { body } = req;

  if (body.content !== undefined) {
    const editContent = {
      content: body.content,
    };
    // 加入第三個參數 { new: true, } 可以回傳新的貼文
    const editPost = await Post.findByIdAndUpdate(id, editContent, { new: true });
    handleSuccess(res, editPost);
  }
});

const createComment = handleErrorAsync(async (req, res, next) => {
  const user = req.user.id;
  const post = req.params.id;
  const { comment } = req.body;

  const createdAt = new Date().getTime();
  const newComment = await Comment.create({
    post,
    user,
    comment,
    createdAt,
  });

  res.status(201).json({
    status: 'success',
    data: {
      comments: newComment,
    },
  });
});

module.exports = {
  getPosts,
  getPostByID,
  createPosts,
  deleteAllPosts,
  deletePostByID,
  editOnePost,
  createComment,
};
