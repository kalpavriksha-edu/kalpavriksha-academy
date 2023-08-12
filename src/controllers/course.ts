import { Request, Response } from 'express';
import  Course from "../model/course";
import { json } from 'stream/consumers';

class CourseController {
    public static async index() {
        try {
            const course =await Course.findAll();
            
            return course;
        } catch (error: any) {
            console.error('An error occurred:', error.message); // Log the error message
            console.error('Stack trace:', error.stack); // Log the stack trace
            return { "error": 'Internal server error' };
        }
    };

    public static async show(id) {
        try {
            
            const course =await Course.findByPk(id);
            console.log(course)
            return course
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return {"error": 'Internal server error' };
        }
    };

   
    public static async create(body) {
        const { name, description, created_by } = body;
        try {
            const course =await Course.create({
                name: String(name),
                description: String(description),
                created_by: String(created_by)
            });
            return {msg:"SUCCESSFULL"}
        } catch (error: any) {
            console.error("An error occurred:", error.message);
            console.error("Stack trace:", error.stack);
            return { error: "Internal server error" };
        }
    };

    public static async delete(id) {
        try {
            await Course.destroy({
                where: {
                    course_id: id
                }
            });
            return {"msg":"Successfully DELETED"}
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return { "error": 'Internal server error' };

        }
    };

    public static async update(params) {
        try {
            const course = await Course.update(params, {
                where: {
                    course_id: params.id,
                },
            });
            return {"msg": "Updated Successfully"};
        } catch (error: any) {
            console.error('An error occurred:', error.message);
            console.error('Stack trace:', error.stack);
            return  {"error": 'Internal server error' };
        }
    };
}

export default CourseController;