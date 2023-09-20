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
  const newPost = await post.save();  
  return res.json(newPost);
}

export async function updateLikes(req, res) {
  const postId = req.query.postId;
  const userId = req.query.userId;
  console.log(userId,postId);
  try{
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { likes: userId } }, 
      { new: true } 
    );
   console.log(updatedPost);
  }
  catch(e){
    console.log(e);
  }
   
  res.json();
}

export async function deletePost(req, res) {
  const postId = req.params.id;
  const post = await Post.deleteOne({ id: postId });
  res.json(post);
}
