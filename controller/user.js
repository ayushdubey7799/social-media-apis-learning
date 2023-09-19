import { User as _User } from '../models/userSchema.js';
import { generateToken } from '../services/authentication.js';
const User = _User;

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render('login', {
      error: 'Invalid Username or Password',
    });
  }
  const token = generateToken(user);
  return res.json({ token, message: 'Successfully signed in' });
}

export async function register(req, res) {
  const { id, name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User({ id, name, email, password });
    await newUser.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', ...newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
