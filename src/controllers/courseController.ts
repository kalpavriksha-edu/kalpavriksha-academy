import { type Request, type Response } from "express"
import { responseGenerator } from "../utility/responseGenerator"
import Course from "../model/courseModel"
import CourseService from "../service/courseService"
import loggerManager from "../utility/logger"
import successEnums from "../constants/successConstant"

const logger = loggerManager.getLogger();
const courseService = new CourseService();

class CourseController {
    public async getCourses(req: Request, res: Response) {
        try {
            const courses = await courseService.getCourses();
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, courses);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    }

    public async getCourseById(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const course = await courseService.getCourseById(id);
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, course);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }

    public async createCourse(req: Request, res: Response) {
        const { name, description, created_by } = req.body;
        try {
            const course = await courseService.createCourse(name, description, created_by);
            return responseGenerator.getSuccessResponse(res, successEnums.CREATED, course);
        } catch (error: any) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    }

    public async deleteCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.deleteCourse(id);
            return responseGenerator.getSuccessResponse(res, successEnums.DELETE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }

    public async updateCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.updateCourse(id, req.body);
            return responseGenerator.getSuccessResponse(res, successEnums.UPDATE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }
}

const courseController = new CourseController();
export default courseController;
