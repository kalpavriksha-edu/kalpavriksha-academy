import { DataTypes, Model, Sequelize } from "sequelize";
import Course from '../model/courseModel'
import database from "../db/dbConnection"

database.connect()
database.syncDatabase()
const sequelize=database.getSequelizeInstance()
const Topic = sequelize.define('Topic', {

    topic_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    video_link: {
        type: DataTypes.STRING,
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    modelName: 'Course',
    timestamps: true
});

Course.hasMany(Topic, { foreignKey: 'course_id' });

export default Topic;
