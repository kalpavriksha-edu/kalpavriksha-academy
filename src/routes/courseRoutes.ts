import { Router } from "express"
import courseController from "../controllers/courseController"

const courseRouter = Router();

courseRouter.get('/courses', courseController.getCourses);
courseRouter.get('/course/:id', courseController.getCourseById);
courseRouter.post('/course', courseController.createCourse);
courseRouter.patch('/course/:id', courseController.updateCourse);
courseRouter.delete('/course/:id', courseController.deleteCourse);

export default courseRouter;
