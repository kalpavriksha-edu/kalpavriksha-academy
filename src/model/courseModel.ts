import { DataTypes, Model } from "sequelize"
import { database } from "../db/dbConnection"

class Course extends Model { };

Course.init({
    courseId: {
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
    }
}, {
    sequelize: database.getSequelizeInstance(),
    tableName: 'courses',
    timestamps: true
});

export default Course;
