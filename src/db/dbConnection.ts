import { Sequelize } from 'sequelize';
import dbConfig from '../config/dbConfig';

class DatabaseConnection {
  private sequelize: Sequelize;

  constructor() {
    const { DB_HOST, DB_PASS, MYSQL_DB } = dbConfig.DB_CONFIG;

    this.sequelize = new Sequelize(MYSQL_DB, process.env.DB_USER, DB_PASS, {
      host: DB_HOST,
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
