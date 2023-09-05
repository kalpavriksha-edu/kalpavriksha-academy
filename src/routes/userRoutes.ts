import { Router } from "express";
import Authorization from "../authentication/auth";
import { UserController } from "../controllers/userController";
import Roles from "../config/roles";

const userController = new UserController();
const authorization = new Authorization();
export default class Routes {
  private router: Router = Router();

  publicRoutes(): Router {
    const publicRouter = Router();
    publicRouter.post("/user", userController.createNewUser);
    publicRouter.post("/user/login", userController.userLogin);
    return publicRouter;
  }

  protectedRoutes(): Router {
    const protectedRouter = Router();
    protectedRouter.use(authorization.tokenValidation);
    protectedRouter.use(authorization.roleValidation(Roles.roles.Admin));
    protectedRouter.patch("/user/:id", userController.updateUserById);
    protectedRouter.get("/users", userController.getAllUsers);
    protectedRouter.get("/user/:id", userController.getUserById);
    protectedRouter.delete("/user/:id", userController.deleteUserById);
    return protectedRouter;
  }
}
