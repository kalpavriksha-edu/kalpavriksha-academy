const express = require('express');
const bodyParser = require('body-parser');
import router = require("./routes/courseRoutes");
import { Request, Response, Express } from 'express';
import loggerManager from "./utility/logger";
const errorEnums = require('./constants/errorConstants');
import { port } from "./config/dbConfig";
import Database from './db/dbConnection';
import { Logger } from "winston";

class Server {
  private PORT: string;
  private app: Express;
  logger: Logger;
  database: Database;
  constructor() {
    this.PORT = port.PORT;
    this.logger = loggerManager.getLogger();
    this.app = express();
    this.database = new Database();
  }

  async start() {
    try {
      this.app.listen(this.PORT, () => {
        console.log("Server is running at port..." + this.PORT);
      });
      await this.database.connect();
      await this.database.syncDatabase();
    } catch (error) {
      this.logger.error(error);
    }

    this.setupMiddleware();
    this.setupRoutes();
    this.setup404Handler();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setupRoutes() {
    this.app.use('/', router);
  }

  setup404Handler() {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ error: errorEnums.ERR_URL });
    });
  }
}

const server = new Server();
server.start();
