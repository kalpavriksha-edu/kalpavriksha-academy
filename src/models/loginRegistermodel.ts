import { Model, DataTypes } from "sequelize";
import dbConnection from "../db/databaseConnection";

class LoginModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
}

LoginModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
  
    {
      sequelize: dbConnection.getSequelizeInstance(), 
      tableName: "user_table",
    }
  );
  
  export default LoginModel;