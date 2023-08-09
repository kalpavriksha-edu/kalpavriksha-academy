import "reflect-metadata"
import { DataSource } from "typeorm"

import { Course } from "/home/komal/Documents/kalpavriksha-academy/src/entity/course.ts"


export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "kalpriksha",
    synchronize: true,
    logging: false,
    entities: [Course],
    migrations: [],
    subscribers: [],
})
