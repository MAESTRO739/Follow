import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import { v2 as cloudinary } from "cloudinary";

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const { postedBy, text } = req.body;
    let { image } = req.body;

    if (!postedBy || !text) {
      return res.status(400).json({ error: 'Posted by and text fields are required' });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    const maxPostLength = 500;
    if (text.length > maxPostLength) {
      return res.status(400).json({ error: `Post text must be less than ${maxPostLength} characters` });
    }

    if (image) {
      const uploadedResponse = await cloudinary.uploader.upload(image);
      image = uploadedResponse.secure_url; 
    }

    const newPost = new Post({ postedBy, text, image });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', newPost });

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      res.status(200).json({ message: 'Post unliked successfully' });
    } else {
      post.likes.push(userId);
      await post.save();
      res.status(200).json({ message: 'Post liked successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

const replyToPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;
    const { text } = req.body;
    const { name, username, avatar } = req.user;

    if (!text) {
      return res.status(400).json({ error: 'Text field is required' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const reply = {
      userId,
      text, 
      name,
      username,
      avatar,
    };

    post.replies.push(reply);
    await post.save();

    res.status(200).json({ message: 'Reply added successfully', post });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

const getPostsFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { following } = user;

    const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

    res.status(200).json(feedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
}

export {
  getPostById,
  createPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getPostsFeed
};
