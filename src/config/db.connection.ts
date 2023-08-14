import mysql from 'mysql';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pooja@9004',
    database: 'crud',
    connectionLimit: 10,
    multipleStatements: true,
});
export default pool;