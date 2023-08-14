import express, { Request, Response } from 'express';
import mysql from 'mysql';
import routes from './routes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The application is listening on port ${PORT}!`);
});
