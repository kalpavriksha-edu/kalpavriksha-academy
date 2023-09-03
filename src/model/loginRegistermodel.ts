import { Model, DataTypes} from "sequelize";
import { DataType } from "sequelize-typescript";
import Database from "../db/dbConnection";

const database = new Database();

class LoginModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public token!:string;
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
      token:{
        type:DataType.STRING,
        allowNull:true,
      },
    },
  
    {
      sequelize: database.getSequelizeInstance(), 
      tableName: "user_table",
    }
  );
  
export default LoginModel;
