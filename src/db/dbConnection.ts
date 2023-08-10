import {Sequelize} from 'Sequelize';
import {db_config} from "../config/db_config"


export const sequelize = new Sequelize(db_config.DATABASE, db_config.USER, db_config.PASSWORD, {
    host: db_config.HOST,
    dialect:  'mysql',
    logging: false 
});


(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to the database has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();
