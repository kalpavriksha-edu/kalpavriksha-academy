import Course from "../model/courseModel";
const errorEnums = require('../constants/errorConstants');
const successEnums = require('../constants/successConstant');
import loggerManager from '../utility/logger';

const logger = loggerManager.getLogger();
class CourseService {
    public async getCourses() {
        try {
            const courses = await Course.findAll();
            return courses;
        } catch (error) {
            logger.error(error.message);
            throw new Error(errorEnums.INT_SERVER_ERR);
        }
    };

    public async getCourseById(id: number) {
        const course = await Course.findByPk(id);
        if (!course) {
            throw new Error(errorEnums.ERR_INVALID_INPUT);
        }
        return course;
    };

    public async createCourse(name: string, description: string, created_by: string) {
        try {
            const course = await Course.create({
                name: String(name),
                description: String(description),
                created_by: String(created_by)
            });
            return course;
        } catch (error) {
            throw new Error(errorEnums.INT_SERVER_ERR);
        }
    };

    public async deleteCourse(id: number) {
        try {
            const affectedRows = await Course.destroy({
                where: {
                    course_id: id
                }
            });
            if (affectedRows === 0) {
                throw new Error();
            }
            return successEnums.DELETE_SUCCESS;
        } catch (error) {
            logger.error(error);
            throw new Error(errorEnums.INT_SERVER_ERR);
        }
    };

    public async updateCourse(id: number, updates: Object) {
        try {
            const [affectedRows] = await Course.update(updates, {
                where: {
                    course_id: id,
                },
            });
            if (affectedRows === 0) {
                throw new Error(errorEnums.ERR_INVALID_INPUT);
            }
            return successEnums.UPDATE_SUCCESS;
        } catch (error) {
            logger.error(error);
            throw new Error(errorEnums.INT_SERVER_ERR);
        }
    };
}

export default CourseService;
