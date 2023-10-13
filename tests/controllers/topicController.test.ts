import request from 'supertest';
import express from 'express';
import topicRouter from '../../src/routes/topicRoutes';

const app = express();
app.use(express.json());
app.use('/', topicRouter);
let id = null;
let courseId = null;
describe('Topic Controller', () => {
    it('should create a new topic', async () => {
      const newTopic = {
        name: "test",
        video_link: "www.test.com",
        course_id: 1,
        created_by: "test" 
    };
    const response = await request(app).post('/topic').send(newTopic);
    id = response.body.data.topic_id
    courseId = 1
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    });

    it('should fetch topics', async () => {
        const response = await request(app).get('/topics');
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should fetch a topics by ID', async () => {
        const response = await request(app).get(`/topic/${id}`);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
    it('should fetch a topics by Coourse ID', async () => {
      const response = await request(app).get(`/topic/course/${courseId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
  });
    it('should update a topic', async () => {
        const updateTopicData = {
            name: 'Node',
        };
        const response = await request(app)
            .patch(`/topic/${id}`)
            .send(updateTopicData);
        const updatedCourseResponse = await request(app).get(`/topic/${id}`);
        expect(updatedCourseResponse.status).toBeDefined();
    });
    it('should delete a topic', async () => {
      const response = await request(app).delete(`/topic/${id}`);
      expect(response).toBeDefined();
    });
});