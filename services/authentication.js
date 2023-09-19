import jwt from 'jsonwebtoken';
const secret = 'Ayush$123$';

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret
  );
}

export function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }

    req.user = decoded.user;
    next();
  });
}
