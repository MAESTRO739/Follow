import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';
import { v2 as cloudinary } from 'cloudinary';

const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password").select("-updatedAt");
    if (!user) { return res.status(404).json({error: "User not found"}); }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in getUserProfile: ', error.message)
  }
}

const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({$or: [{email}, {username}]})

    if (user) {
      return res.status(400).json({error: "User already exists"});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email, 
      username,
      password: hashedPassword
    });
    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        avatar: newUser.avatar,
      })
    } else {
      res.status(400).json({error: "Invalid user data"});
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in signupUser: ', error.message)
  }
}

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) { return res.status(400).json({error: "Invalid username or password"}); }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      bio: user.bio,
      avatar: user.avatar,
    })
    
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in loginUser: ', error.message)
  }
}

const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', {maxAge: 1});
    res.status(200).json({message: 'Logged out successfully'});
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in logoutUser: ', error.message)
  }
}

const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({error: "You can't follow or unfollow yourself"});
    }
    
    if (!userToFollow || !currentUser) { return res.status(404).json({error: "User not found"}); }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      res.status(200).json({message: "User unfollowed successfully"});
    } else {
      // Follow user
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      res.status(200).json({message: "User followed successfully"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in followUnfollowUser: ', error.message)
  }
}
 
const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body;
  let { avatar } = req.body;
  const userId = req.user._id;

  try {
    let user = await User.findById(userId);
    if (!user) { return res.status(404).json({error: "User not found"}); }

    if (req.params.id !== userId.toString()) { return res.status(403).json({error: "You can only update your own profile"}); }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    if (avatar) {
      if (user.avatar) {
        const publicId = user.avatar.match(/upload\/v\d+\/(.+)\./)[1];
        await cloudinary.uploader.destroy(publicId);
      }
      const uploadedResponse = await cloudinary.uploader.upload(avatar);
      avatar = uploadedResponse.secure_url;
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.username = username || user.username;
    user.avatar = avatar || user.avatar;
    user.bio = bio || user.bio;

    user = await user.save();

    user.password = null;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log('Error in updateUser: ', error.message)
  }
}

export { 
  getUserProfile, 
  signupUser, 
  loginUser,
  logoutUser, 
  followUnfollowUser, 
  updateUser 
};
