const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  image:{
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: {
    type: Array,
    default: []
  }
,
  likeCount: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Post', postSchema);
