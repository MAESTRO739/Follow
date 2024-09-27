import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
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

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export {
  getPostById,
  createPost,
  updatePost,
  deletePost
};
