import { Request, Response} from 'express';
import {AppDataSource} from "../config/data-source"
import {Topic} from "../entity/topic" 

// getting all posts
const getTopics = async (req: Request, res: Response) => {
    // get some posts
   

    const course = await AppDataSource.manager.find(Topic)
    
    return res.status(200).json({
        message: course
    });  
};

const getTopic= async (req: Request, res: Response) => {
    // get the post id from the req
    let id:number = +req.params.id;
    console.log(id);
    const topic = await AppDataSource.manager.findBy(
        Topic, 
        { topic_id : id}
    )
    
    return res.status(200).json({
        message: topic
    });

};


const getTopicByCourse= async (req: Request, res: Response) => {
    // get the post id from the req
    let id:number = +req.params.id;
    console.log(id);
    const topic = await AppDataSource.manager.findBy(
        Topic, 
        { course_id: id}
    )
    
    return res.status(200).json({
        message: topic
    });

};


const updateTopic = async (req: Request, res: Response) => {
    // get the post id from the req.params
    let id:number = +req.params.id;
    let name: string = req.body['name'];
    let course_id: number = req.body['course_id'];
    let video_link: string = req.body['video_link'];

    console.log(name)

    let topic_update = await AppDataSource.manager.findBy(
        Topic, 
        { topic_id: id}
    );
    
    console.log(topic_update)
   
    const topic = new Topic()
    topic.topic_id=topic_update[0].topic_id;
    topic.name = req.params.name ?? topic_update[0].name ;
    topic.video_link = req.params.video_link ?? topic_update[0].video_link;
  //  topic.course_id = req.params.course_id ?? topic_update[0].course_id; 
    console.log(topic)
    const responce=await AppDataSource.manager.save(topic)
    return res.status(200).json({
        message: responce
    });
};

const deleteTopic = async (req: Request, res: Response) => {
    // get the post id from req.params
    let id  = req.params.id;
    const topic = await AppDataSource.manager.delete(
        Topic, 
        { topic_id: id}
    )
    
    return res.status(200).json({
        message: 'post deleted successfully'
    });
};


const addTopic= async (req: Request, res: Response) => {
    
    // get the data from req.body
    let name: string = req.body['name'];
    let course_id: number = req.body['course_id'];
    let video_link: string = req.body['video_link'];

    console.log(name,course_id,video_link)

    const topic =new Topic()
    topic.course_id  = course_id
    topic.name=name
    topic.video_link=video_link

    console.log(topic)
    // add the post

    AppDataSource.manager.save(topic)
    
    return res.status(200).json({
        message: "save !!"
    });
};



export default {getTopic,getTopics,updateTopic,deleteTopic,addTopic,getTopicByCourse};