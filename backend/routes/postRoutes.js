import express from 'express';
import { getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

router.get('/:id', getPostById);
router.post('/create', protectRoute, createPost);
router.put('/:id', updatePost);
router.delete('/:id', protectRoute, deletePost);

export default router;
