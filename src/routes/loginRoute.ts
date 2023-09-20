import express from 'express';
import { signUpValidation, loginValidation } from '../helpers/validation';
import  LoginController  from '../controllers/loginController'; 

const router = express.Router();
const loginController = new LoginController();

router.post('/register', signUpValidation, loginController.register);
router.post('/login', loginValidation, loginController.login);

export default router;
