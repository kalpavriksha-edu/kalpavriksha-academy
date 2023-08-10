import { Request, Response } from 'express';
import Course from "../model/course";

class CourseController {
    public static async index(req: Request, res: Response) {
        try {
            const course = await Course.findAll();
            return res.status(200).json(course);
        } catch (error: any) {
            console.error('An error occurred:', error.message); // Log the error message
            console.error('Stack trace:', error.stack); // Log the stack trace
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    public static async show(req: Request, res: Response) {
        try {
            const course = await Course.findByPk(req.params.id);
            return res.status(200).json(course);
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };

    public static async create(req: Request, res: Response) {
        const { name, description, created_by } = req.body;
        try {
            const course = await Course.create({
                name: String(name),
                description: String(description),
                created_by: String(created_by)
            });
            return res.status(201).json(course);
        } catch (error: any) {
            console.error("An error occurred:", error.message);
            console.error("Stack trace:", error.stack);
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    public static async delete(req: Request, res: Response) {
        try {
            await Course.destroy({
                where: {
                    course_id: req.params.id
                }
            });
            return res.status(200).end();
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return res.status(500).json({ error: 'Internal server error' });

        }
    };

    public static async update(req: Request, res: Response) {
        try {
            const course = await Course.update(req.body, {
                where: {
                    course_id: req.params.id,
                },
            });
            res.status(200).end("successfully updated");
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}

export default CourseController;