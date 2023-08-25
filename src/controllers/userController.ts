import { Request, Response, NextFunction } from "express";
import loggerManager from "../utility/logger";
import successEnums from "../constants/successConstant";
import { responseGenerator } from "../utility/responseGenerator";
import UserService from "../service/userService";

const logger = loggerManager.getLogger();
const userService = new UserService();

export class UserController {
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
      return responseGenerator.getErrorResponse(res, 500);
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
      return responseGenerator.getErrorResponse(res, 500);
    }
  }

  public async getUserById(req: Request, res: Response) {
    const id: number = Number(req.params.id);
    try {
        const user = await userService.getUserById(id);
        return responseGenerator.getSuccessResponse(res, successEnums.COURSE_FETCHED, user);
    } catch (error) {
        logger.error(error);
        return responseGenerator.getErrorResponse(res, 404);
    }
}

  public async updateUserById(req: Request, res: Response) {
    try {
      const id: number = Number(req.params.id);
      let { name, email, password } = req.body;
      await userService.updateUserById(id, name, email, password);
      return responseGenerator.getSuccessResponse(
        res,
        successEnums.UPDATE_SUCCESS
      );
    } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res, 404);
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
      return responseGenerator.getErrorResponse(res, 404);
    }
  }

  public async userLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
       const jsontoken = await userService.userLogin(email,password);
       return responseGenerator.getSuccessResponse(
        res,
        successEnums.LOGIN_SUCCSESS,
        jsontoken
    )
      } catch (error) {
      logger.error(error);
      return responseGenerator.getErrorResponse(res,401);
    }
  }
}
