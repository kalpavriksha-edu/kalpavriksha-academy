import express from 'express';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

class ExpressApp {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  getApp() {
    return this.app;
  }

  startServer() {
    this.app.listen(process.env.APP_PORT, () => {
      console.log(`Server is listening on port: ${process.env.APP_PORT}`);
    });
  }
}

export default ExpressApp;
