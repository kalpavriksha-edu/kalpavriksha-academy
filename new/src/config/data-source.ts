import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User"
import { Course } from "../entity/course"
import { Topic } from "../entity/topic"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "kalpriksha",
    synchronize: true,
    logging: false,
    entities: [User,Course,Topic],
    migrations: [],
    subscribers: [],
})
