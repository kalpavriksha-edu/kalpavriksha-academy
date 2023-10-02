import express from 'express';
import { signUpValidation, loginValidation } from '../helpers/validation';
import  LoginController  from '../controllers/loginController'; 

const router = express.Router();
const loginController = new LoginController();

router.post('/register', signUpValidation, loginController.register);
router.post('/login', loginValidation, loginController.login);

router.get('/auth/google', loginController.googleAuth); 
router.get('/auth/google/callback', loginController.googleAuthCallback); 

export default router;
