import dbConnection from './src/db/databaseConnection'; 
import ExpressApp from './app';
import router from './src/routes/route';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

const expressApp = new ExpressApp();

class Server {
  constructor() {}

  async start() {
    await dbConnection.connect(); 
    await dbConnection.syncDatabase(); 

    const sequelize = dbConnection.getSequelizeInstance(); 
    sequelize.authenticate().then(() => {
      console.log('Database authenticated successfully.');
    }).catch(error => {
      console.error('Error authenticating to the database:', error);
    });

    const app = expressApp.getApp();
    app.use("/", router);
    expressApp.startServer();
  }
}

const server = new Server();
server.start();

