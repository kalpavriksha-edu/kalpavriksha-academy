import express from 'express';
import path from 'path';
import LoginController from '../controllers/loginController'; 

const user_route = express();
const loginController = new LoginController();
user_route.set('view engine', 'ejs');
user_route.set('views', path.join(__dirname, '..','./views')); 
user_route.use(express.static('public'));

user_route.get('/mail-verification', loginController.verifyMail);

export default user_route;
