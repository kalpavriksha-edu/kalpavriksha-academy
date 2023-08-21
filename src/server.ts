const express = require('express');
const bodyParser = require('body-parser');
import router = require("./routes/courseRoutes");
import { Request, Response } from 'express';
import  loggerManager  from "./utility/logger";
const errorEnums  = require('./constants/errorConstants');
import { port } from "./config/dbConfig";

const PORT = port.PORT;
const app = express();

import { database } from './db/dbConnection';
const logger = loggerManager.getLogger();

(async()=> {
  try {
    app.listen(PORT, () => {
      console.log("Server is running at port..." + PORT);
    });
    await database.connect();
    await database.syncDatabase();
  } catch (error) {
    logger.error(error);
  }
})();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: errorEnums.ERR_URL });
});
