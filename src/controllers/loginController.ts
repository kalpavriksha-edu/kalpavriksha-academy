import { Request, Response } from 'express';
import { responseGenerator } from '../utility/responseGenerator';
import LoginService from '../service/loginService';
import successConstant from '../constants/successConstant';
import LoggerManager from '../utility/logger';

const logger = LoggerManager.getLogger();
const loginService = new LoginService();

class LoginController {
  public async register(req: Request, res: Response) {
    try {
      const response = await loginService.register(req, res);
      logger.info('User registered', response);
      return responseGenerator.getSuccessResponse(res, successConstant.REGISTER_SUCCESS, response);
    } catch (error) {
      logger.error('Error in register:', error);
      return responseGenerator.getErrorResponse(res, 500);
    }
  }

  public async verifyMail(req: Request, res: Response) {
    try {
      const response = await loginService.verifyMail(req);
      logger.info('Mail verified:', response);
      return responseGenerator.getSuccessResponse(res, successConstant.MAIL_VERIFY_SUCCESS, response);
    } catch (error) {
      logger.error('Error in verifyMail:', error);
      return responseGenerator.getErrorResponse(res, 404);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const response = await loginService.login(req, res);
      logger.info('User logged in:', response);
      return responseGenerator.getSuccessResponse(res, successConstant.LOGIN_SUCCESS, response);
    } catch (error) {
      logger.error('Error in login:', error);
      return responseGenerator.getErrorResponse(res, 500);
    }
  }
}
export default LoginController;
