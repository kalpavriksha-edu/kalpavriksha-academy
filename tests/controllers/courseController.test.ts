import request from 'supertest';
import express from 'express';
import router from '../../src/routes/courseRoutes';

const app = express();
app.use(express.json());
app.use('/', router);

describe('CourseController', () => {
    it('should fetch courses', async () => {
        const response = await request(app).get('/courses');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should fetch a course by ID', async () => {
        const courseId = 22;
        const response = await request(app).get(`/course/${courseId}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should create a new course', async () => {
        const newCourse = {
            name: 'React',
            description: 'React description',
            created_by: 'Unknown',
        };

        const response = await request(app).post('/course').send(newCourse);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should delete a course', async () => {
        const courseId = 18;
        const response = await request(app).delete(`/course/${courseId}`);
        expect(response).toBeDefined();
    });

    it('should update a course', async () => {
        const courseId = 23;
        const updatedCourseData = {
            name: 'Node',
        };

        const response = await request(app)
            .patch(`/course/${courseId}`)
            .send(updatedCourseData);
        const updatedCourseResponse = await request(app).get(`/course/${courseId}`);
        expect(updatedCourseResponse.status).toBeDefined();
    });
});
