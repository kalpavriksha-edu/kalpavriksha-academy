import express from 'express';
import { signUpValidation, loginValidation } from '../helpers/validation';
import  UserController  from '../controller/userController'; 

const router = express.Router();
const userController = new UserController();

router.post('/register', signUpValidation, userController.register);
router.post('/login', loginValidation, userController.login);

export default router;
