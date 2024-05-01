import express from 'express';
import * as blogController from '../Controller/blogController.js'

const router = express.Router();

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogID);
router.post('/', blogController.createBlogPost);
router.put('/like/:id', blogController.likedBlogPost);
router.post('/:id/comment', blogController.addBlogComment);
router.put('/:id/comment/like/:commentIndex', blogController.likeBlogComment);
router.delete('/:id', blogController.deleteBlogPost);
export default router;