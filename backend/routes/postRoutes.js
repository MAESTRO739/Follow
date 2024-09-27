import express from 'express';
import { getPostById, createPost, deletePost, likeUnlikePost, replyToPost } from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:id', getPostById);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.post('/like/:id', protectRoute, likeUnlikePost);
router.post('/reply/:id', protectRoute, replyToPost);

export default router;
