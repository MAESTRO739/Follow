import express from 'express';
import { getPostById, createPost, deletePost, likeUnlikePost, replyToPost, getPostsFeed } from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/feed', protectRoute, getPostsFeed);
router.get('/:id', getPostById);
router.post('/create', protectRoute, createPost);
router.delete('/:id', protectRoute, deletePost);
router.put('/like/:id', protectRoute, likeUnlikePost);
router.put('/reply/:id', protectRoute, replyToPost);

export default router;
