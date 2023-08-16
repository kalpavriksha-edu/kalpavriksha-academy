import express from 'express';
import authorization from '../auth/loginAuth';
import loginControllerInstance from '../controllers/logincontroller';
const router = express.Router();

router.post('/register',loginControllerInstance.register,authorization);
router.post('/login', loginControllerInstance.login);



export default router;