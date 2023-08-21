import { Sequelize } from 'sequelize';
import { dbConfig } from "../config/dbConfig";
const errorEnums = require('../constants/errorConstants');
const successEnums = require('../constants/successConstant');
import loggerManager from '../utility/logger';

const logger = loggerManager.getLogger();
class Database {
  private sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
      host: dbConfig.HOST,
      dialect: 'mysql',
      logging: false
    });
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      logger.info(successEnums.DATABASE_CONNECT);
    } catch (error) {
      logger.error(errorEnums.ERR_DATABASE);
      logger.error(error);
    }
  }

  async syncDatabase() {
    try {
      await this.sequelize.sync();
      logger.info(successEnums.DATABASE_SYNC);
    } catch (error) {
      logger.error(errorEnums.ERR_DATABASE_SYNC);
      logger.error(error);
    }
  }
  getSequelizeInstance() {
    return this.sequelize;
  }
}
export const database = new Database();
