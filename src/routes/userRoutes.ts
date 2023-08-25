import { Router } from "express";
import authorization from "../authentication/tokenValidation";
import { UserController } from "../controllers/userController";

const userController = new UserController();
export default class Routes {
  private router: Router = Router();

  publicRoutes(): Router {
    const publicRouter = Router();
    publicRouter.post("/user", userController.createNewUser);
    publicRouter.post("/user/login", userController.userLogin);
    publicRouter.get("/user/:id",userController.getUserById);
    return publicRouter;
  }

   protectedRoutes(): Router {
    const protectedRouter = Router();
    protectedRouter.use(authorization);
    protectedRouter.get("/users", userController.getAllUsers);
    protectedRouter.patch("/user/:id", userController.updateUserById);
    protectedRouter.delete("/user/:id", userController.deleteUserById);
    return protectedRouter;
  }

   
}