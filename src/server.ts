const express = require('express');
const bodyParser = require('body-parser');
import router = require("./routes/course.routes");

const PORT = 3000;
const app = express();

const { sequelize } = require('./db/dbConnection');

(async () => {
  try {
    app.listen(PORT, () => {
      console.log("Server is running at port..." + PORT);
    });
    await sequelize.sync();
    console.log('Database synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing the database:', error);
  }
})();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', router);
app.use("/*", (req, res) => {
  res.send({ "msg": "URL NOT DEFINE" })
  res.end()
});