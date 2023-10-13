import TopicService from '../../src/service/topicService'

describe('TopicServices', () => {
    const topicService = new TopicService();
    let id = null;
    let courseId = null;
    it('should create a new Topic', async () => {
        const newTopic = {
            name: "test",
            video_link: "www.test.com",
            course_id: 1,
            created_by: "test" 
        };
        const createTopic = await topicService.createTopic(
            newTopic.name,
            newTopic.course_id,
            newTopic.video_link,
            newTopic.created_by
        );
        courseId = createTopic.dataValues.course_id
        id = createTopic.dataValues.topic_id
        expect(createTopic).toBeDefined();
    });

    it('should fetch all topics', async () => {
        const topic = await topicService.getTopic();
        expect(topic).toBeDefined();
    });

    it('should fetch a topic by ID', async () => {

        const topic = await topicService.getTopicById(id);
        expect(topic).toBeDefined();
    });

    it('should fetch a topic by couser_id', async () => {

        const topic = await topicService.getTopicByCourseId(courseId);
        expect(topic).toBeDefined();
    });


    it('should update a topic', async () => {
        const updatedTopicData = {
            name: 'test123',
        };
        const msg= await topicService.updateTopic(id, updatedTopicData);
        console.log(msg);
        const updatedTopic = await topicService.getTopicById(id);
        expect(updatedTopic).toBeDefined();
    });

    it('should delete a topic', async () => {
        const topicDeleted = await topicService.deleteTopic(id);
        expect(topicDeleted).toBeDefined();
    });
});