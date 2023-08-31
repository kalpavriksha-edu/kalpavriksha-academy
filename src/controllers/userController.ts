import { Request, Response } from 'express';
import UserService from '../services/userService'; 

const userService = new UserService();

class UserController {
  public async register(req: Request, res: Response) {
    return await userService.register(req, res); 
  }

  public async verifyMail(req: Request, res: Response) {
    return await userService.verifyMail(req, res); 
  }

  public async login(req: Request, res: Response) {
    return await userService.login(req, res);
  }
}

export default UserController;
