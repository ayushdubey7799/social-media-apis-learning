import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  id: Number,
  userId: Number,
  title: String,
  description: String,
  image: String,
  likes: [Number],
  postedBy: String,
});

const Post = mongoose.model('Post', postSchema);
export { Post };
