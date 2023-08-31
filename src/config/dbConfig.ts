require('dotenv').config();

const dbConfig = {
    JWT_SECRET: process.env.JWT_SECRET ,
    DB_CONFIG: {
        DB_HOST: process.env.DB_HOST ,
        DB_PASS: process.env.DB_PASS ,
        MYSQL_DB: process.env.MYSQL_DB 
    },
    SMTP_CONFIG: {
        SMTP_MAIL: process.env.SMTP_MAIL,
        SMTP_PASSWORD: process.env.SMTP_PASSWORD
    }
};

export default dbConfig;
