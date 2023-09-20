import { Router } from 'express';
import { register, userLogin } from '../controller/user.js';

const router = Router();

router.post('/register', register).post('/login', userLogin).get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      res.send('Logged out successfully!');
    });
  })
const _router = router;
export { _router as router };

