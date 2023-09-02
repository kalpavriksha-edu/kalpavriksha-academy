import UserModel from "../model/userModel";
import loggerManager from "../utility/logger";
import errorEnums from "../constants/errorConstants";
import successEnums from "../constants/successConstant";
import { genSaltSync, hashSync, compareSync } from "bcryptjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      const allUsers: UserInterface[] = await UserModel.findAll({ raw: true });
      return allUsers;
    } catch (error) {
      logger.error(error.message);
      logger.error(errorEnums.INT_SERVER_ERR);
    }
  }

  public async getUserById(id: number) {
    const user = await UserModel.findByPk(id);
    if (!user) {
      logger.error(errorEnums.ERR_INVALID_INPUT);
    }
    return user;
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
      logger.error(errorEnums.INT_SERVER_ERR);
    }
  }

  public async updateUserById(
    id: number,
    name: string,
    email: string,
    password: string
  ) {
    try {
      const salt = genSaltSync(10);
      const hashPassword = hashSync(password, salt);
      const [affectedRows] = await UserModel.update(
        {
          name: String(name),
          email: String(email),
          password: String(hashPassword),
        },
        { where: { id } }
      );

      if (affectedRows === 0) {
        logger.error(errorEnums.ERR_INVALID_INPUT);
      }
      return successEnums.UPDATE_SUCCESS;
    } catch (error) {
      logger.error(error);
      logger.error(errorEnums.INT_SERVER_ERR);
    }
  }

  public async deleteUserById(id: number) {
    try {
      const affectedRows = await UserModel.destroy({ where: { id } });
      if (affectedRows === 0) {
        throw new Error();
      }
      return successEnums.DELETE_SUCCESS;
    } catch (error) {
      logger.error(error);
      logger.error(errorEnums.INT_SERVER_ERR);
    }
  }

  public async userLogin(email: string, password: string) {
    try {
      const user = await UserModel.findOne({ where: { email } });

      if (!user) {
        return logger.error(errorEnums.ERR_INVALID_INPUT);
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        user.password = undefined;
        const jsontoken = jwt.sign({ user }, "qwe1234", {
          expiresIn: "1h",
        });
        return jsontoken;
      } else {
        throw new Error();
      }
    } catch (error) {
      logger.error(errorEnums.ERR_INVALID_INPUT);
      throw new Error();
    }
  }
}

export default UserService;
