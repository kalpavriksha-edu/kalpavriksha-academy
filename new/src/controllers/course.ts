import { Request, Response} from 'express';
import {AppDataSource} from "../config/data-source"
import {Course} from "../entity/course" 
import { User } from '../entity/User';
import { Tree } from 'typeorm';
// getting all posts
const getCourses = async (req: Request, res: Response) => {
    // get some posts
   

    const course = await AppDataSource.manager.find(Course)
    
    return res.status(200).json({
        message: course
    });  
};

const getCourse = async (req: Request, res: Response) => {
    let id:string  = req.params.id;
    // get the post
    console.log(id)
    const course = await AppDataSource.manager.query("SELECT * FROM course where course_id = "+id)
    
    
    return res.status(200).json({
        message:   course
    });
};


const updateCourse = async (req: Request, res: Response) => {
    // get the post id from the req.params
    let id: number = +req.params.id;

    let name: string = req.body['name'];
    let author: string = req.body['author'];
    let description: string = req.body['description'];
    // console.log(name,author,description)

     const course_update = await AppDataSource.manager.query("SELECT * FROM course where course_id = "+id)
    
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

const deleteCourse = async (req: Request, res: Response) => {
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


const addCourse = async (req: Request, res: Response) => {
    
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



export default { getCourses,getCourse,updateCourse ,deleteCourse,addCourse};