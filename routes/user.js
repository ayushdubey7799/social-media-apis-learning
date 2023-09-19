import { Router } from 'express';
import { register, userLogin } from '../controller/user.js';

const router = Router();

router.post('/register', register).post('/login', userLogin);
//   .delete("/delete/:id",userController.deleteTask);

const _router = router;
export { _router as router };
