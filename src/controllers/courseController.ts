import { Request, Response } from 'express';
import Course from "../model/course.model";

class CourseController {
    public static async get() {
        try {
            const course = await Course.findAll();
            return course;
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return { "error": 'Internal server error' };
        }
    };

    public static async getById(id: number) {
        try {
            const course = await Course.findByPk(id);
            return course;
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return { "error": 'Internal server error' };
        }
    };

    public static async create(body: any) {
        const { name, description, created_by } = body;
        try {
            const course = await Course.create({
                name: String(name),
                description: String(description),
                created_by: String(created_by)
            });
            return { msg: "Successfully Created" };
        } catch (error: any) {
            console.error("An error occurred:", error.message);
            console.error("Stack trace:", error.stack);
            return { error: "Internal server error" };
        }
    };

    public static async delete(id: number) {
        try {
            await Course.destroy({
                where: {
                    course_id: id
                }
            });
            return { msg: "Successfully Deleted" }
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return { "error": 'Internal server error' };
        }
    };

    public static async update(body: any, id: number) {
        try {
            const course = await Course.update(body, {
                where: {
                    course_id: id,
                },
            });
            return { msg: "Updated Successfully" };
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return { "error": 'Internal server error' };
        }
    };
}

export default CourseController;