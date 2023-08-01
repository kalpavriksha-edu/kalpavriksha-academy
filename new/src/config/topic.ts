const express = require('express');
import controller from "../controllers/topic";
const router = express.Router();

router.get('/topics', controller.getTopics);
router.get('/topic/:id', controller.getTopic);
router.get('/topicByCourse/:id', controller.getTopic);

router.put('/topic/:id', controller.updateTopic);
router.delete('/topic/:id', controller.deleteTopic);
router.post('/topic', controller.addTopic);

export = router;