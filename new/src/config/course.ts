const express = require('express');
import controller from "../controllers/course";
const router = express.Router();

router.get('/courses', controller.getCourses);
router.get('/course/:id', controller.getCourse);
router.put('/course/:id', controller.updateCourse);
router.delete('/course/:id', controller.deleteCourse);
router.post('/course', controller.addCourse);

export = router;