import express from 'express';
import path from 'path';
import UserController from '../controller/userController'; 

const user_route = express();
const userController = new UserController();
user_route.set('view engine', 'ejs');
user_route.set('views', path.join(__dirname, '..','./views')); 
user_route.use(express.static('public'));

user_route.get('/mail-verification', userController.verifyMail);

export default user_route;
