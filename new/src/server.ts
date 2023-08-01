const http = require('http');
import  { Express } from 'express';
const express = require('express')
const morgan = require('morgan');

const  routes_course = require('../src/routes/course');
const  routes_topic = require('../src/routes/topic');

import {AppDataSource} from "./routes/data-source"

const router: Express = express();

AppDataSource.initialize().then(async () => {

    router.use(morgan('dev'));
/** Parse the request */
router.use(express.urlencoded({ extended: false }));
/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
    });
  

    /** Routes */
    
    router.use('/',routes_course);
    router.use('/',routes_topic);



    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('not found');
        return res.status(404).json({
            message: error.message
        });
    });

    /** Server */
    const httpServer = http.createServer(router);
    const PORT: any = process.env.PORT ?? 6061;
    httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));

    console.log("Database set!!")

}).catch(error => console.log(error))

/** Logging */
