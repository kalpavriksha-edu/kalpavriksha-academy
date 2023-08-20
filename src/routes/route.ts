import express from 'express';
import loginAuth from '../auth/loginAuth';
import loginControllerInstance from '../controllers/loginController';
const router = express.Router();

router.post('/register',loginAuth,loginControllerInstance.register);
router.post('/login', loginControllerInstance.login);

export default router;
