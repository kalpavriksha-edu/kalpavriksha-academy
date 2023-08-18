import { DataTypes, Model } from "sequelize";
const { sequelize } = require('../db/dbConnection');
import Course from '../model/courseModel'

//class Topic extends Model {};
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
    sequelize,
    modelName: 'Course',
    timestamps: true
});

Course.hasMany(Topic, { foreignKey: 'course_id' });

export default Topic;