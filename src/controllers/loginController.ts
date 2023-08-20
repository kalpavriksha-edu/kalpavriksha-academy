import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import LoginModel from '../models/loginRegistermodel';
import { genSaltSync, hashSync } from 'bcryptjs';

class loginController {
  constructor() {}

  async register(req: Request, res: Response) {
    try {
      const { password } = req.body;

      const salt = genSaltSync(10);
      const hashPassword = hashSync(password, salt);
      const newUser = await LoginModel.create({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
        role: req.body.role,
      });

      return res
        .status(201)
        .json({ message: 'User Added Successfully!!', data: newUser });
    } catch (err) {
      console.error('Sequelize validation error:', err.message);
      return res.status(500).json(err);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await LoginModel.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({
          success: 0,
          data: 'Invalid email or password!!',
        });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        user.password = undefined;

        const jsontoken = jwt.sign({ user }, 'kh123pp', {
          expiresIn: '1h',
        });

        return res.json({
          success: 1,
          message: 'Login successfully',
          token: jsontoken,
        });
      } else {
        return res.json({
          success: 0,
          message: 'Invalid email or password',
        });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  }
}

const export loginControllerInstance = new loginController();
