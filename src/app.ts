import express from 'express';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();


import Routes from "./Router/Routes";


class ExpressApp {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  getApp() {
    this.app.use("/", Routes.publicRoutes());
    this.app.use("/", Routes.protectedRoutes());
    return this.app;
  }

  

  startServer() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log(`Server is listening on port: ${process.env.APP_PORT}`);
    });
  }

}

export default ExpressApp;
