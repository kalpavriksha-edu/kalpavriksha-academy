import { Router } from "express";
import Authorization from "../authentication/auth";
import userController from "../controllers/userController";
import Roles from "../config/roles";

const authorization = new Authorization();

const userRouter = Router();

userRouter.post("/user", userController.createNewUser);
userRouter.post("/user/login", userController.userLogin);

userRouter.patch(
  "/user/:id",
  authorization.tokenValidation,
  authorization.roleValidation(Roles.roles.Admin),
  userController.updateUserById
);
userRouter.get(
  "/users",
  authorization.tokenValidation,
  authorization.roleValidation(Roles.roles.Admin),
  userController.getAllUsers
);
userRouter.get(
  "/user/:id",
  authorization.tokenValidation,
  authorization.roleValidation(Roles.roles.Admin),
  userController.getUserById
);
userRouter.delete(
  "/user/:id",
  authorization.tokenValidation,
  authorization.roleValidation(Roles.roles.Admin),
  userController.deleteUserById
);

export default userRouter;
