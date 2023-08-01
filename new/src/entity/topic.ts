import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Topic { 

    @PrimaryGeneratedColumn()
    topic_id: number;
    
    @Column()
    name:string;
    
    @Column()
    course_id:number;
    
    @Column()
    video_link:string;


    // constructor(name:string, course_id:number,video_link:string)
    // { 
    //     this.name = name;
    //     this.course_id = course_id;
    //     this.video_link = video_link;
    // }
    // disp():void
    // { 
    //     console.log("Topic Name                  :              "+this.name); 
    //     console.log("Topic course_id             :              "+this.course_id); 
    //     console.log("Topic video_link            :              "+this.video_link);
    // } 
}