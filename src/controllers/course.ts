import { Request, Response} from 'express';
import {AppDataSource} from "../config/data-source"
import {Course} from "../entity/course" 

class CourseController{
    public static async index(req: Request, res: Response){
        const course = await AppDataSource.manager.find(Course)
        return res.status(200).json({
            message: course
        });  
    };

    public static async show(req: Request, res: Response){
        let id:number = +req.params.id;
        console.log(id)
        const course = await AppDataSource.manager.findBy(
            Course, 
            { course_id : id}
        )
        return res.status(200).json({
            message:   course
        });
    };

    public static async update(req: Request, res: Response){
        let id: number = +req.params.id;
        let name: string = req.body['name'];
        let author: string = req.body['author'];
        let description: string = req.body['description'];
        // console.log(name,author,description)
        console.log(id)
        const course_update = await AppDataSource.manager.findBy(
            Course, 
            { course_id : id}
        )
        console.log(course_update)
        const course =new Course()
        course.course_id= id
        course.name = name ?? course_update[0].name ;
        course.author = author?? course_update[0].author;
        course.description = description?? course_update[0].description; 
        console.log(course)
        const responce=await AppDataSource.manager.save(course)
        return res.status(200).json({
            message: "Done"
        });
    };

    public static async delete(req: Request, res: Response){
        // get the post id from req.params
        let id: number = + req.params.id;
        const course = await AppDataSource.manager.delete(
            Course, 
            { course_id : id}
        )
        
        return res.status(200).json({
            message: 'post deleted successfully'
        });
    };

    public static async create(req: Request, res: Response){
        
        // get the data from req.body
        console.log(req)
        // const myRequest = new Course( req.body);
        let name: string = req.body['name'];
        let author: string = req.body['author'];
        let description : string = req.body['description'];
        const course =new Course()
        course.name=name;
        course.author=author;
        course.description=description;
        console.log(course)
        // add the post

        AppDataSource.manager.save(course)
        // return response
        return res.status(200).json({
            message: "save !!"
        });
    };

}


export default CourseController;