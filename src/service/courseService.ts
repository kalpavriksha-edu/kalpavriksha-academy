import Course from "../model/courseModel"
import loggerManager from "../utility/logger"
import errorEnums from "../constants/errorConstants"
import successEnums from "../constants/successConstant"

const logger = loggerManager.getLogger();
class CourseService {
    public async getCourses() {
        try {
            const courses = await Course.findAll();
            return courses;
        } catch (error) {
            logger.error(error.message);
        }
    }

    public async getCourseById(id: number) {
        try {
            const course = await Course.findByPk(id);
            if (!course) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            } else {
                return course;
            }
        } catch (error) {
            logger.error(errorEnums.INT_SERVER_ERR);
        }

    }

    public async createCourse(name: string, description: string, created_by: string) {
        try {
            const course = await Course.create({
                name: String(name),
                description: String(description),
                created_by: String(created_by)
            });
            return course;
        } catch (error) {
            logger.error(error.message);
        }
    }

    public async deleteCourse(id: number) {
        try {
            const affectedRows = await Course.destroy({
                where: {
                    course_id: id
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

    public async updateCourse(id: number, updates: Object) {
        try {
            const [affectedRows] = await Course.update(updates, {
                where: {
                    course_id: id
                }
            })
            if (affectedRows === 0) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            } else {
                return successEnums.UPDATE_SUCCESS;
            }
        } catch (error) {
            logger.error(error);
        }
    }
}

export default CourseService;
