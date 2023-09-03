import { DataTypes, Model } from "sequelize"
import { database } from "../db/dbConnection"

class Assignment extends Model { };

Assignment.init({
    assignmentId: {
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
        type: DataTypes.STRING,
        allowNull: false
    },
    max_score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    topic_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize: database.getSequelizeInstance(),
    modelName: 'Assignment',
    timestamps: true
});

export default Assignment;
