import UserModel from "../model/userModel";
import loggerManager from "../utility/logger";
import errorEnums from "../constants/errorConstants";
import errorConstant from "../constants/errorConstants";
import successEnums from "../constants/successConstant";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { responseGenerator } from "../utility/responseGenerator";
import dotenv from "dotenv";
dotenv.config();

const logger = loggerManager.getLogger();

interface UserInterface {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

class UserService {
  public async getAllUsers() {
    try {
      const allUsers: UserInterface[] = await UserModel.findAll({
        raw: true,
        attributes: { exclude: ["password"] },
      });
      return allUsers;
    } catch (error) {
      logger.error(error.message);
      logger.error(errorEnums.INT_SERVER_ERR);
      throw responseGenerator.getError(error);
    }
  }

  public async getUserById(id: number) {
    try {
      const user = await UserModel.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) {
        throw new Error(errorConstant.ERR_INVALID_INPUT.message);
      }
      return user.dataValues;
    } catch (error) {
      throw responseGenerator.getError(error);
    }
  }

  public async createNewUser(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    try {
      const salt = genSaltSync(10);
      const hashPassword = hashSync(password, salt);
      const newUser: UserInterface = await UserModel.create({
        name: String(name),
        email: String(email),
        password: String(hashPassword),
        role: String(role),
      });

      return newUser;
    } catch (error) {
      logger.error(error);
      throw responseGenerator.getError(error);
    }
  }

  public async updateUserById(id: number, body) {
    try {
      if (body.password) {
        const salt = genSaltSync(10);
        const hashPassword = hashSync(body.password, salt);
        body.password = hashPassword;
      }
      const [affectedRows] = await UserModel.update(body, { where: { id } });

      if (affectedRows === 0) {
        logger.error(errorConstant.ERR_INVALID_INPUT.message);
        throw new Error(errorConstant.ERR_INVALID_INPUT.message);
      }
      return successEnums.UPDATE_SUCCESS;
    } catch (error) {
      logger.error(error);
      throw responseGenerator.getError(error);
    }
  }

  public async deleteUserById(id: number) {
    try {
      const affectedRows = await UserModel.destroy({ where: { id } });
      if (affectedRows === 0) {
        throw new Error(errorConstant.ERR_INVALID_INPUT.message);
      }
      return successEnums.DELETE_SUCCESS;
    } catch (error) {
      logger.error(error);
      throw responseGenerator.getError(error);
    }
  }

  public async userLogin(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        throw new Error(errorConstant.ERR_INVALID_INPUT.message);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        user.password = undefined;
        const jsontoken = jwt.sign({ user }, process.env.KEY, {
          expiresIn: "1h",
        });
        return jsontoken;
      } else {
        throw new Error(errorConstant.ERR_INVALID_INPUT.message);
      }
    } catch (error) {
      logger.error(error);
      throw errorConstant.ERR_INVALID_INPUT;
    }
  }
}

export default UserService;
