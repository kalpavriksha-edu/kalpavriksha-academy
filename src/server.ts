import { type Request, type Response, type Express } from "express";
import { type Logger } from "winston";
import { port } from "./config/dbConfig";
import express from "express";
import bodyParser from "body-parser";
import loggerManager from "./utility/logger";
import router from "./routes/courseRoutes";
import Database from "./db/dbConnection";
import errorEnums from "./constants/errorConstants";
import Routes from "./routes/userRoutes";

class Server {
  private readonly PORT: string;
  private readonly app: Express;
  private readonly logger: Logger;
  private readonly database: Database;

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
    this.configureMiddleware();
    this.setupRoutes();
    this.handleInvalidUrlRequests();
  }

  configureMiddleware() {
    this.app.use(express.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setupRoutes() {
    const route = new Routes();
    this.app.use("/", router);
    this.app.use("/", route.publicRoutes());
    this.app.use("/", route.protectedRoutes());
  }

  handleInvalidUrlRequests() {
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({ error: errorEnums.ERR_URL });
    });
  }
}

const server = new Server();
server.start();
