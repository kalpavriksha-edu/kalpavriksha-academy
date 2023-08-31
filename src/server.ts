import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import './db/dbConnection';
import RouteController from './routes/routes';
import WebRouteController from './routes/webRoute';
import LoggerManager from './utility/logger';
import { responseGenerator } from './utility/responseGenerator';
import errorConstant from './constants/errorConstants';
import { Logger } from 'winston';

class App {
    private app: Express;
    private logger: Logger;

    constructor() {
        this.app = express();
        this.logger = LoggerManager.getLogger();
        this.setup();
        this.routes();
        this.errorHandling();
    }

    private setup() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private routes() {
        this.app.use('/user', RouteController);
        this.app.use('/', WebRouteController);
    }

    private errorHandling() {
        this.app.use((err: any, req: Request, res: Response) => {
            err.statusCode = err.statusCode || 500;
            err.message = err.message || errorConstant.INTERNAL_SERVER_ERROR.message;

            this.logger.error(err);

            return responseGenerator.getErrorResponse(res, err.statusCode);
        });
    }

    

    public start(port: number) {
        this.app.listen(port, () => {
            console.log(`Server is listening to port ${port}`);
        });
    }
}

const app = new App();
app.start(3000);
