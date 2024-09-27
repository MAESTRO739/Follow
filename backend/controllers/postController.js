import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getAllPosts = (req, res) => {
  res.send('Get all posts');
};

const getPostById = (req, res) => {
  res.send(`Get post with ID: ${req.params.id}`);
};

const createPost = async (req, res) => {
  try {
    const { postedBy, text, image } = req.body;

    if (!postedBy || !text) {
      return res.status(400).json({ message: 'Posted by and text fields are required' });
    }

    const user = await User.findById(postedBy);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    const maxPostLength = 500;
    if (text.length > maxPostLength) {
      return res.status(400).json({ message: `Post text must be less than ${maxPostLength} characters` });
    }

    const newPost = new Post({ postedBy, text, image });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', newPost });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const updatePost = (req, res) => {
  res.send(`Update post with ID: ${req.params.id}`);
};

const deletePost = (req, res) => {
  res.send(`Delete post with ID: ${req.params.id}`);
};

export {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};
