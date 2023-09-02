import { Router } from 'express';
import { topicController } from "../controllers/topicController";

const topicRouter = Router();

topicRouter.get('/topics', topicController.getTopics);
topicRouter.get('/topic/:id', topicController.getTopicById);
topicRouter.get('/topic/course/:id', topicController.getTopicByCouser);
topicRouter.post('/topic', topicController.createTopic);
topicRouter.patch('/topic/:id', topicController.updatetTopic);
topicRouter.delete('/topic/:id', topicController.deleteTopic);

export default topicRouter;
