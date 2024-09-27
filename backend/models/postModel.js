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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
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
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  shares: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
}, {
  timestamps: true
})

const Post = mongoose.model('Post', postSchema);

export default Post;
