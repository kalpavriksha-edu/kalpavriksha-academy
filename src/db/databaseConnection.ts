import { Sequelize } from 'sequelize';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();


class DatabaseConnection {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(process.env.MYSQL_DB, process.env.DB_USER, process.env.DB_PASS, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    });
  }

  
  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log('Database connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  async syncDatabase() {
    try {
      await this.sequelize.sync();
      console.log('Database synchronized successfully.');
    } catch (error) {
      console.error('Error syncing database:', error);
    }
  }

  getSequelizeInstance() {
    return this.sequelize;
  }
}

const dbConnection = new DatabaseConnection(); 

export default dbConnection;
