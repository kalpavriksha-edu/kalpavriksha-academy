import { DataTypes, Model } from "sequelize"
import Database from "../db/dbConnection"

const database = new Database();

class Course extends Model { };

Course.init({
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: database.getSequelizeInstance(),
    modelName: 'Course',
    timestamps: true
});

export default Course;

