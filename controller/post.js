import { Post } from '../models/postSchema.js';
import multer from 'multer';
import { uploadImage } from '../services/uploadImage.js';


export async function getAllPosts(req, res) {
  const posts = await Post.find();
  res.json(posts);
}

export async function addPost(req, res) {
  req.body.image = await uploadImage(req.file.path);
  // req.body.id = +req.body.id;
  // console.log(req.file.buffer);
  const post = new Post(req.body);
  await post.save();  
  return res.json(req.body);
}

export async function updateLikes(req, res) {
  const postId = req.query.postId;
  const userId = req.query.userId;
  const postToBeUpdated = await Post.findOne({ id: postId });
  postToBeUpdated.likes.push(userId);
  const post = await Post.findOneAndReplace({ id: postId }, postToBeUpdated, {
    new: true,
  });
  res.json(post);
}

export async function deletePost(req, res) {
  const postId = req.params.id;
  const post = await Post.deleteOne({ id: postId });
  res.json(post);
}
