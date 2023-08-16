const dotenv = require('dotenv');

dotenv.config();

const dbConfig = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASS,
    DATABASE: process.env.DB_NAME,
};
export default  dbConfig;