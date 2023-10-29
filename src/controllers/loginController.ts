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
  public async googleAuth(req: Request, res: Response) {
    try {
      loginService.googleAuth(req, res);
    } catch (error) {
      logger.error('Error in Google Auth:', error); 
      res.status(500).send('Internal Server Error'); 
    }
  }

  public async googleAuthCallback(req: Request, res: Response) {
    try {
      loginService.googleAuthCallback(req, res);
    } catch (error) {
      logger.error('Error in Google Auth Callback:', error); 
      res.status(500).send('Internal Server Error'); 
    }
  }
   
  public async failed(req: Request, res: Response) {
    try {
      loginService.failed(req, res);
    } catch (error) {
      logger.error('Error in Failed:', error);
      return responseGenerator.getErrorResponse(res, 500);
    }
  }

  public async success(req: Request, res: Response) {
    try {
      loginService.success(req, res);
    } catch (error) {
      logger.error('Error in Success:', error);
      return responseGenerator.getErrorResponse(res, 500);
    }
  }

  public async logout(req: Request, res: Response){
    req.session.destroy((err) => {
      if (err) {
        logger.error('Error while destroying session:', err);
      } else {
        req.logout(() => {
          logger.info('You are logged out');
          res.redirect('/');
        });
      }
    });
  }
}
export default LoginController;
