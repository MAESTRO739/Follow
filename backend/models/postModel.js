import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    maxLength: 500
  },
  image: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  replies: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      name: {
        type: String
      },
      username: {
        type: String
      },
      text: {
        type: String,
        required: true,
      },
      avatar: {
        type: String
      }
    }
  ],
  reposts: {
    type: Number,
    default: 0
  },
  shares: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

export default Post;
