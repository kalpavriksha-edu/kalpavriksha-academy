import { Request, Response, NextFunction } from "express";
import loggerManager from "../utility/logger";
import successEnums from "../constants/successConstant";
import { responseGenerator } from "../utility/responseGenerator";
import UserService from "../service/userService";
import UserModel from "../model/userModel";
import Roles from "../config/roles";

const logger = loggerManager.getLogger();
const userService = new UserService();

class UserController {
  public async getAllUsers(req: Request, res: Response) {
    try {
      const allUsers = await userService.getAllUsers();
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.USER_FETCHED,
        allUsers
      );
    } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, error);
    }
  }

  public async createNewUser(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      const newUser = await userService.createNewUser(
        name,
        email,
        password,
        role
      );
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.USER_CREATED,
        newUser
      );
    } catch (error: any) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, error);
    }
  }

  public async getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    try {
      const user = await userService.getUserById(id);
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.USER_FETCHED,
        user
      );
    } catch (error) {
      logger.error(error.code);
      return responseGenerator.getErrorResponse(res, error);
    }
  }

  public async updateUserById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      const data = await UserModel.findOne({
        where: {
          id: id,
        },
      });
      if (!data) {
        return responseGenerator.getErrorResponse(res, 404);
      }

      const body = req.body;
      await userService.updateUserById(id, body);

      return responseGenerator.getSuccessResponse(
        res,
        successEnums.UPDATE_SUCCESS
      );
    } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, error);
    }
  }

  public async deleteUserById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);

      await userService.deleteUserById(id);
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.DELETE_SUCCESS
      );
    } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, error);
    }
  }

  public async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const jsontoken = await userService.userLogin(email, password);
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.LOGIN_SUCCSESS,
        jsontoken
      );
    } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, error);
    }
  }
}

const userController = new UserController();
export default userController;
