import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import LoginModel from '../models/loginRegisterModel';
import randomstring from 'randomstring';
import MailSender from '../helpers/sendMail';
import jwt from 'jsonwebtoken';
import {dbConfig} from '../config/dbConfig';  
import errorConstants from '../constants/errorConstants'; 
import successConstants from '../constants/sucessConstant'; 
import LoggerManager from '../utility/logger'; 

const logger = LoggerManager.getLogger();

class LoginService {
  public async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return { success: false, errors: errors.array() };
      }
  
      const existingUser = await LoginModel.findOne({ where: { email: req.body.email } });
  
      if (existingUser) {
        return { success: false, msg: errorConstants.USER_ALREADY_EXISTS.message };
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = await LoginModel.create({
          name: req.body.name,
          role: req.body.role,
          email: req.body.email,
          password: hashedPassword,
        });
  
        const result = await this.sendVerificationEmail(req.body.email, req.body.name);
  
        if (result.success) {
          newUser.token = result.token;
          await newUser.save();
          return { success: true, msg: successConstants.REGISTER_SUCCESS.message };
        } else {
          return { success: false, msg: errorConstants.EMAIL_VERIFICATION_ERROR.message };
        }
      }
    } catch (error) {
      logger.error('Error during user registration:', error);
      return { success: false, msg: errorConstants.INTERNAL_SERVER_ERROR.message };
    }
  }
  
  private async sendVerificationEmail(email: string, name: string) {
    try {
      const mailSubject = 'Mail Verification';
      const randomToken = randomstring.generate();
      const content = `<p> Hi ${name}, Please <a href="http://localhost:3000/mailVerification?token=${randomToken}">verify your account</a></p>`;
  
      await MailSender.sendMail(email, mailSubject, content);
  
      return { success: true, token: randomToken };
    } catch (error) {
      console.log('Error sending mail:', error.message);
      return { success: false };
    }
  }
  

  public async verifyMail(req: Request) {
    try {
      const token = req.query.token as string;
      const user = await LoginModel.findOne({ where: { token } });
      if (user) {
        await user.update({ token: null });
        return { message: successConstants.MAIL_VERIFY_SUCCESS.message };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      logger.error('Error during email verification:', error);
      throw error;
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await LoginModel.findOne({ where: { email: req.body.email } });

      if (!user) {
        return res.status(401).send({
          msg: errorConstants.INVALID_CREDENTIALS.message,
        });
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, dbConfig.JWT_SECRET, { expiresIn: '1h' });
        await user.update({ updatedAt: new Date() });

        return res.status(200).send({
          msg: successConstants.LOGIN_SUCCESS.message,
          token,
          user,
        });
      } else {
        return res.status(401).send({
          msg: errorConstants.INVALID_CREDENTIALS.message,
        });
      }
    } catch (error) {
      logger.error('Error during login:', error);
      return res.status(500).send({
        msg: errorConstants.INTERNAL_SERVER_ERROR.message,
      });
    }
  }  
}

export default LoginService;
