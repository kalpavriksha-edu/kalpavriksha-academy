import { Router } from "express"
import courseController from "../controllers/courseController"

const router = Router();

router.get('/courses', courseController.getCourses);
router.get('/course/:id', courseController.getCourseById);
router.post('/course', courseController.createCourse);
router.patch('/course/:id', courseController.updateCourse);
router.delete('/course/:id', courseController.deleteCourse);

export default router;

