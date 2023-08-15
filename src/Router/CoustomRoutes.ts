import { Router } from "express";
import authorization from "../auth/token_validatiion";
import {UserController} from "../controller/userController";

const userController = new UserController();
export default class CoustomRoutes {
  private router: Router = Router();

 static publicRoutes(): Router {
    const publicRouter = Router();
    publicRouter.post("/user/login",userController.userLogin);
    publicRouter.post("/user", userController.createNewUser);
    return publicRouter;
  }

  static protectedRoutes(): Router {
    const protectedRouter = Router();
    protectedRouter.use(authorization);
    protectedRouter.get("/users", userController.getAllUsers);
    protectedRouter.patch("/user/:id", userController.updateUserById);
    protectedRouter.delete("/user/:id", userController.deleteUserById);
    return protectedRouter;
  }
}

