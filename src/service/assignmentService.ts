import Assignment from "../model/assignmentModel"
import loggerManager from "../utility/logger"
import errorEnums from "../constants/errorConstants"
import successEnums from "../constants/successConstant"

const logger = loggerManager.getLogger();

class AssignmentService {
    public async getAssignments() {
        try {
            const assignment = await Assignment.findAll();
            return assignment;
        } catch (error) {
            logger.error(error.message);
        }
    }

    public async getAssignmentById(id: number) {
        try {
            const assignment = await Assignment.findByPk(id);
            if (!assignment) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            } else {
                return assignment;
            }
        } catch (error) {
            logger.error(errorEnums.INT_SERVER_ERR);
        }

    }

    public async createAssignment(name: string, description: string, max_score: number, created_by: string, topic_id: number) {
        try {
            const assignment = await Assignment.create({
                name: String(name),
                description: String(description),
                max_score: Number(max_score),
                created_by: String(created_by),
                topic_id: Number(topic_id)
            });
            return assignment;
        } catch (error) {
            logger.error(error.message);
        }
    }

    public async deleteAssignment(id: number) {
        try {
            const affectedRows = await Assignment.destroy({
                where: {
                    assignment_id: id
                }
            });
            if (affectedRows === 0) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            } else {
                return successEnums.DELETE_SUCCESS;
            }
        } catch (error) {
            logger.error(errorEnums.INT_SERVER_ERR);
        }
    }

    public async updateAssignment(id: number, updates: Object) {
        try {
            const [affectedRows] = await Assignment.update(updates, {
                where: {
                    assignment_id: id
                }
            })
            if (affectedRows === 0) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            } else {
                return successEnums.UPDATE_SUCCESS;
            }
        } catch (error) {
            logger.error(errorEnums.INT_SERVER_ERR);
        }
    }
}

export default AssignmentService;
