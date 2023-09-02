import dotenv from "dotenv";

dotenv.config()

export const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET ,
};

export const SMTP_CONFIG = {
SMTP_MAIL: process.env.SMTP_MAIL,
SMTP_PASSWORD: process.env.SMTP_PASSWORD
};

export const port = {
    PORT: process.env.PORT
};
