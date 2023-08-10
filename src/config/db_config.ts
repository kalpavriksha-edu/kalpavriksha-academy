const dotenv = require('dotenv');

dotenv.config();

export const db_config = {
    HOST: process.env.HOST || "localhost",
    USER: process.env.USER || "root",
    PASSWORD: process.env.PASSWORD || "password",
    DATABASE: process.env.DATABASE || "kalpavriksha",
}


