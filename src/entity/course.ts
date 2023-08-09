import { Entity, PrimaryColumn,PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Course { 
    //class scope 
    @PrimaryGeneratedColumn()
    course_id:number;

    @Column()
    name:string;

    @Column()
    author:string;

    @Column()
    description:string;

}