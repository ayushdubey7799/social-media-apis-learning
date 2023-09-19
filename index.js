import dotenv from 'dotenv';
import multer from 'multer';
import { connect } from 'mongoose';
import bodyParser from 'body-parser';
import express, { json } from 'express';
import { router } from './routes/user.js';
import { router as _router } from './routes/post.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/users', router);
app.use('/posts', _router);
// app.post('/api/uploadFile', upload.single('myFile'), (req, res) => {
//   console.log(`I'm here`);
//   console.log(req.file);
// });

main().catch((err) => console.log(err));

async function main() {
  await connect(process.env.DATABASE_URL);
  console.log('Database connected');
}

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
