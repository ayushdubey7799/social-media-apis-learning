import multer from 'multer';
import {
  addPost,
  deletePost,
  updateLikes,
  getAllPosts,
} from '../controller/post.js';
import { Router } from 'express';
import { verifyToken } from '../services/authentication.js';


const router = Router();
const upload = multer({ dest: '/home/ctp/Templates' });
router
  .get('/get-posts', verifyToken,getAllPosts)
  .post('/upload', verifyToken, upload.single('myImage'), addPost)
  .patch('/update-likes', verifyToken, updateLikes)
  .delete('/delete/:id', verifyToken, deletePost);

export { router };
