import { Request, Response } from 'express';
import Course from "../model/courseModel";
import CourseService from '../service/courseService';
import { responseGenerator } from '../utility/responseGenerator';
import logger from '../utility/logger';

const courseService = new CourseService();

class CourseController {
    public async getCourses(req: Request, res: Response) {
        try {
            const courses = await courseService.getCourses();
            return responseGenerator.getSuccessResponse(res, 'Courses Fetched Successfully', courses);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async getCourseById(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const course = await courseService.getCourseById(id);
            return responseGenerator.getSuccessResponse(res, 'Course Fetched Successfully', course);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };

    public async createCourse(req: Request, res: Response) {
        const { name, description, created_by } = req.body;
        try {
            const course = await courseService.createCourse(name, description, created_by);
            return responseGenerator.getSuccessResponse(res, 'Course Successfully Created', course);
        } catch (error: any) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async deleteCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.deleteCourse(id);
            return responseGenerator.getSuccessResponse(res, 'Course Successfully Deleted');
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };

    public async updateCourse(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await courseService.updateCourse(id, req.body);
            return responseGenerator.getSuccessResponse(res, 'Course Updated Successfully');
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
}

export const courseController = new CourseController();