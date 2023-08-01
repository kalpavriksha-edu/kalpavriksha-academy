import { Entity, PrimaryColumn,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Course { 
    //class scope 
    @PrimaryGeneratedColumn()
    course_id:Number;

    @Column()
    name:string;

    @Column()
    author:string;

    @Column()
    description:string;

    // constructor()
    // { 
       
    // }

    // constructor(couser_id:number,name:string,author:string,description:string)
    // { 
    //     this.course_id=this.course_id
    //     this.name = name;
    //     this.author = author;
    //     this.description = description;
    // }
//     disp():void
//     { 
//         console.log("Course Id                   :              "+this.course_id); 
//         console.log("Course Name                 :              "+this.name); 
//         console.log("Course Author               :              "+this.author); 
//         console.log("Course Description          :              "+this.description);
//     } 
}