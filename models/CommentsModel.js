const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, '留言不得為空'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      require: [true, '無此用戶'],
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'post',
      require: [true, '無此用戶貼文'],
    },
  },
  {
    versionKey: false,
    collection: 'comment'
  }
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name id createdAt',
  });
  next();
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
