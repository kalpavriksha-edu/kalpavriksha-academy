import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import LoginModel from '../models/loginRegisterModel';
import randomstring from 'randomstring';
import MailSender from '../helpers/sendMail';
import jwt from 'jsonwebtoken';
import dbConfig from '../config/dbConfig';  
import errorConstants from '../constants/errorConstants'; 
import successConstants from '../constants/sucessConstants'; 
import LoggerManager from '../utility/logger'; 

const logger = LoggerManager.getLogger();

class UserService {
  public async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const existingUser = await LoginModel.findOne({ where: { email: req.body.email } });

      if (existingUser) {
        return res.status(409).send({
          msg: errorConstants.USER_ALREADY_EXISTS.message,
        });
      } else {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await LoginModel.create({
          name: req.body.name,
          role: req.body.role,
          email: req.body.email,
          password: hashedPassword,
        });

        const mailSubject = 'Mail Verification';
        const randomToken = randomstring.generate();
        const content =
          `<p> Hi ${req.body.name}, Please <a href="http://localhost:3000/mail-verification?token=${randomToken}">verify your account</a></p>`;

        MailSender.sendMail(req.body.email, mailSubject, content);

        newUser.token = randomToken;
        await newUser.save();

        return res.status(200).send({
          msg: successConstants.REGISTER_SUCCESS.message,
        });
      }
    } catch (error) {
      logger.error('Error during user registration:', error);
      return res.status(500).send({
        msg: errorConstants.INTERNAL_SERVER_ERROR.message,
      });
    }
  }

  public async verifyMail(req: Request, res: Response) {
    try {
      const token = req.query.token;
      const user = await LoginModel.findOne({ where: { token } });

      if (user) {
        const newToken = req.query.token as string;
        user.token = newToken;
        await user.save();
        return res.render('mail-verification', { message: successConstants.MAIL_VERIFY_SUCCESS.message });
      } else {
        return res.render('404');
      }
    } catch (error) {
      logger.error('Error during email verification:', error);
      return res.render('404');
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

export default UserService;
