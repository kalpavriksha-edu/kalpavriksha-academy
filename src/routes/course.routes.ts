import { Request, Response, Router } from 'express';
import CourseController from "../controllers/courseController";

const router = Router();

router.get('/courses', (req: Request, res: Response) => {
    return CourseController.get().then(
        Response => {
            res.send(Response).end();
        }
    );
});

router.get('/course/:id', (req: Request, res: Response) => {
    CourseController.getById(req.params.id).then(
        Response => {
            res.send(Response).end();
        }
    )
});

router.patch('/course/:id', (req: Request, res: Response) => {
    CourseController.update(req.body, req.params.id).then(
        Response => {
            res.send(Response).end();
        }
    )
});

router.delete('/course/:id', (req: Request, res: Response) => {
    CourseController.delete(req.params.id).then(
        Response => {
            res.send(Response).end();
        }
    )
});

router.post('/course', (req: Request, res: Response) => {
    CourseController.create(req.body).then(
        Response => {
            res.send(Response).end();
        }
    )
});

module.exports = router;