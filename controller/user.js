import { User } from '../models/userSchema.js';
// import { generateToken } from '../services/authentication.js';

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render('login', {
      error: 'Invalid Username or Password',
    });
  }
  // const token = generateToken(user);
  req.session.authenticated = true;
  return res.json({ message: 'Successfully signed in',data: user });
}

export async function register(req, res) {
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const newUser = new User(req.body);
    console.log(newUser);
    await newUser.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', ...newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}
