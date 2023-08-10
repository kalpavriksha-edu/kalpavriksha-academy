import { DataTypes, Model } from "Sequelize";
import { sequelize } from '../db/dbConnection';
import { timeStamp } from "console";


class Course extends Model {};

Course.init({
    course_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Course',
    timestamps: true
});

export default Course;