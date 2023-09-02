import dotenv from "dotenv"

dotenv.config()

export const dbConfig = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE
};

export const port = {
    PORT: process.env.PORT
};
