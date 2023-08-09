const express = require('express');
import CourseController from "../controllers/course";
const router = express.Router();


router.get('/courses', CourseController.index);
router.get('/course/:id', CourseController.show);
router.patch('/course/:id', CourseController.update);
router.delete('/course/:id', CourseController.delete);
router.post('/course',CourseController.create);

export = router;  