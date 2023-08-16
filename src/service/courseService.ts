import Course from "../model/courseModel";
import logger from '../utility/logger';

class CourseService {

    public async getCourses() {
        try {
            const courses = await Course.findAll();
            return courses;
        } catch (error) {
            logger.error('An error occurred:', error.message);
            logger.error('Stack trace:', error.stack);
            throw new Error('Internal server error');
        }
    };

    public async getCourseById(id: number) {
        const course = await Course.findByPk(id);
        if (!course) {
            throw new Error(`Resourse Not Found`);
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
            throw new Error('Internal server error');
        }
    };

    public async deleteCourse(id: number) {
        const affectedRows = await Course.destroy({
            where: {
                course_id: id
            }
        });
        if (affectedRows === 0) {
            throw new Error('Resource Not Found');
        }
        return "Successfully Deleted";
    } catch(error: Error) {
        logger.error('An error occurred:', error);
        throw new Error('Internal server error');
    };

    public async updateCourse(id: number, updates: Object) {
        try {
            const [affectedRows] = await Course.update(updates, {
                where: {
                    course_id: id,
                },
            });
            if (affectedRows === 0) {
                throw new Error(`Resources Not Found`);
            }
            return "Successfully Updated";
        } catch (error) {
            logger.error('An error occurred:', error);
            throw new Error('Internal server error');
        };
    };
}

export default CourseService;