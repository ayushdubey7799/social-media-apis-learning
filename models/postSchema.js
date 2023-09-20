import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
  userId: String,
  title: String,
  description: String,
  image: String,
  likes: [String],
  postedBy: String,
});

const Post = mongoose.model('Post', postSchema);
export { Post };
