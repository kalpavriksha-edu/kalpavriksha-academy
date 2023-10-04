import { type Request, type Response, type Express } from "express"
import { type Logger } from "winston"
import { port } from "./config/dbConfig"
import express from "express"
import bodyParser from "body-parser"
import loggerManager from "./utility/logger"
import router from "./routes/courseRoutes"
import loginrouter from "./routes/loginRoute"
import webRouter from "./routes/webRoute"
import database, { Database } from "./db/dbConnection"
import errorEnums from "./constants/errorConstants"

class Server {
  private readonly PORT: string;
  private readonly app: Express;
  private readonly logger: Logger;
  private readonly database: Database;

  constructor() {
    this.PORT = port.PORT;
    this.logger = loggerManager.getLogger();
    this.app = express();
    this.database = database;
  }

  async start() {
    try {
      this.app.listen(this.PORT, () => {
        console.log("Server is running at port..." + this.PORT);
      })
      await this.database.connect();
      await this.database.syncDatabase();
    } catch (error) {
      this.logger.error(error);
    }
    this.configureMiddleware();
    this.setupRoutes();
    this.handleInvalidUrlRequests();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setupRoutes() {
    this.app.use('/', router);
    this.app.use('/', loginrouter);
    this.app.use('/',webRouter);
  }

  handleInvalidUrlRequests() {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ error: errorEnums.ERR_URL });
    })
  }
}

const server = new Server();
server.start();
