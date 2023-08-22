import { Request, Response } from 'express';
import Course from "../model/courseModel";
import CourseService from '../service/courseService';
import { responseGenerator } from '../utility/responseGenerator';
const successEnums = require('../constants/successConstant');
import loggerManager from '../utility/logger';

const logger = loggerManager.getLogger();
const courseService = new CourseService();

class CourseController {
    public async getCourses(req: Request, res: Response) {
        try {
            const courses = await courseService.getCourses();
            return responseGenerator.getSuccessResponse(res,successEnums.COURSE_FETCHED, courses);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async getCourseById(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const course = await courseService.getCourseById(id);
            return responseGenerator.getSuccessResponse(res, successEnums.COURSE_FETCHED, course);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };

    public async createCourse(req: Request, res: Response) {
        const { name, description, created_by } = req.body;
        try {
            const course = await courseService.createCourse(name, description, created_by);
            return responseGenerator.getSuccessResponse(res, successEnums.COURSE_CREATED, course);
        } catch (error: any) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async deleteCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.deleteCourse(id);
            return responseGenerator.getSuccessResponse(res, successEnums.DELETE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };

    public async updateCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.updateCourse(id, req.body);
            return responseGenerator.getSuccessResponse(res, successEnums.UPDATE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
}

export const courseController = new CourseController();