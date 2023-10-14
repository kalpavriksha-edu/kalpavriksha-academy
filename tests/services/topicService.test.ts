import { exceptions } from 'winston';
import TopicService from '../../src/service/topicService'
import { error } from 'console';

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
    it('should not create a new Topic', async () => {
        try
        {
            await topicService.createTopic(
                null,
                null,
                null,
                null
            );
        }
        catch(error)
        {
            expect(error).toBeDefined();
        }
        
    });
    it('should fetch all topics', async () => {
        const topic = await topicService.getTopic();
        expect(topic).toBeDefined();
    });

    it('should not fetch all Topic', async () => {
        try
        {
            await topicService.createTopic(
                null,
                null,
                null,
                null
            );
        }
        catch(error)
        {
            expect(error).toBeDefined();
        }
        
    });
    it('should fetch a topic by ID', async () => {

        const topic = await topicService.getTopicById(id);
        expect(topic).toBeDefined();
    });

    it('should not fetch a topic by ID', async () => {
        try
        {
            const topic = await topicService.getTopicById(-1);
        }
        catch(error)
        {
            expect(error).toBeDefined();   
        }
    });
    it('should fetch a topic by couser_id', async () => {
        const topic = await topicService.getTopicByCourseId(courseId);
        expect(topic).toBeDefined();
    });
    it('should not fetch  by course_id', async () => {
        try
        {
            const topic = await topicService.getTopicByCourseId(-1);
        }
        catch(error)
        {
            console.log(error)
            expect(error).toBeDefined();
            
        }
    });

    it('should update a topic', async () => {
        const updatedTopicData = {
            name: 'test123',
        };
        const msg= await topicService.updateTopic(id, updatedTopicData);
        const updatedTopic = await topicService.getTopicById(id);
        expect(updatedTopic).toBeDefined();
    });

    it('should not update a topic', async () => {
        try
        {
            const updatedTopicData = {
                name: 'test123',
            };
            const msg= await topicService.updateTopic(-1, updatedTopicData);
            const updatedTopic = await topicService.getTopicById(-1);
        }
        catch(error)
        {
            expect(error).toBeDefined();   
        }
    });

    it('should delete a topic', async () => {
        const topicDeleted = await topicService.deleteTopic(id);
        expect(topicDeleted).toBeDefined();
    });
    it('should not delete a topic', async () => {
        try
        {
            const topic = await topicService.deleteTopic(-1);
        }
        catch(error)
        {
            expect(error).toBeDefined();
            
        }
    });

});