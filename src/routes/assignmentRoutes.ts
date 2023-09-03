import { Router } from "express"
import assignmentController from "../controllers/assignmentController"
// import router from "./courseRoutes";

const router = Router();

router.get('/assignments', assignmentController.getAssignments);
router.get('/assignment/:id', assignmentController.getAssignmentById);
router.post('/assignment', assignmentController.createAssignment);
router.patch('/assignment/:id', assignmentController.updateAssignment);
router.delete('/assignment/:id', assignmentController.deleteAssignment);

export default router;
