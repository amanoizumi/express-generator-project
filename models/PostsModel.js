const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content 未填寫'],
    },
    image: {
      type: String,
      default: '',
    },
    createdAt: {
      type: Number,
      default: Date.now,
      select: false,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, '貼文 ID 未填寫'],
    },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
