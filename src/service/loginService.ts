import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import LoginModel from '../model/loginRegisterModel';
import randomstring from 'randomstring';
import MailSender from '../helpers/sendMail';
import jwt from 'jsonwebtoken';
import {dbConfig} from '../config/dbConfig';  
import errorConstants from '../constants/errorConstants'; 
import successConstants from '../constants/successConstant'; 
import LoggerManager from '../utility/logger'; 
import passport from '../authentication/passport';

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
        const randomToken = randomstring.generate();

        const newUser = await this.userRegister(req.body.name, req.body.role, req.body.email, req.body.password, randomToken);

        await this.sendVerificationMail(newUser.email, newUser.name, randomToken);

        return { success: true, msg: successConstants.REGISTER_SUCCESS.message };
      }
    } catch (error) {
      logger.error('Error during user registration:', error);
      return { success: false, msg: errorConstants.INTERNAL_SERVER_ERROR.message };
    }
  }

  public async userRegister(name: string, role: string, email: string, password: string, token: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await LoginModel.create({
      name,
      role,
      email,
      password: hashedPassword,
      token,
    });
    return newUser;
  }
  public async sendVerificationMail(email: string, name: string, token: string) {
    const mailSubject = 'Mail Verification';
    const content = `<p> Hi ${name}, Please <a href="http://localhost:3000/mail-verification?token=${token}">verify your account</a></p>`;
    await MailSender.sendMail(email, mailSubject, content);
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
  public async googleAuth(req: Request, res: Response) {
    passport.authenticate('google', {
      scope: ['email', 'profile'],
    })(req, res);
  }
  public async googleAuthCallback(req: Request, res: Response) {
    passport.authenticate('google', {
      failureRedirect: '/failed',
    })(req, res, () => {
      res.redirect('/success');
    });
  }
  public async failed(req: Request, res: Response) {
    console.log('User is not authenticated');
    res.send("Failed:Please Register");
  }
  
  public async success(req: Request,res: Response) {
    console.log('You are logged in');
    res.send(`Welcome ${req.user?.displayName}`);
  }
} 

export default LoginService;
