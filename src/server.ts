import  { Express } from 'express';
const express = require('express');
const bodyParser = require('body-parser');
import router = require("./config/course");

const PORT = 3000;

const app = express();

import { sequelize } from './db/dbConnection';

(async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running at port..." + PORT);
    });
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);

