import dbConnection from "./dbConnection/dbconnection";
import ExpressApp from "./app";
// import Routes from "./Router/Routes";

const expressApp = new ExpressApp();

class Server {
  static async start() {
    expressApp.startServer();
    await dbConnection.connect();
    await dbConnection.syncDatabase();

    const sequelize = dbConnection.getSequelizeInstance();
    sequelize
      .authenticate()
      .then(() => {
        console.log("Database authenticated successfully.");
      })
      .catch((error) => {
        console.error("Error authenticating to the database:", error);
      });


      // expressApp.Routes();
    expressApp.getApp();
    // app.use("/", Routes.publicRoutes());
    // app.use("/", Routes.protectedRoutes());
    // expressApp.startServer();
  }
}

Server.start();
