import Topic from "../model/topicModel";
import logger from '../utility/logger';



class TopicService {
    

    public async getTopic() {
        try {
            const topic = await Topic.findAll();

            return topic;
        } catch (error) {
            logger.error('An error occurred:', error.message);
            logger.error('Stack trace:', error.stack);
            throw new Error('Internal server error');
        }
    };

    public async getTopicById(id: number) {
        const topic = await Topic.findByPk(id);
        if (!topic) {
            throw new Error(`Resourse Not Found`);
        }
        return topic;
    };

    public async getTopicByCourseId(id: number) {
        const topic = await Topic.findAll({
            where : {
                course_id: Number(id)
            }
        });
        if (!topic) {
            throw new Error(`Resourse Not Found`);
        }

        return topic;
    };


    public async createTopic(name: string,course_id: number,video_link: string ,created_by: string) {
        try {
            const topic = await Topic.create({
                name: name,
                video_link: video_link,
                course_id: course_id,
                created_by: created_by
            });
            return topic;
        } catch (error) {
            throw new Error('Internal server error');
        }
    };

    public async deleteTopic(id: number) {
        const affectedRows = await Topic.destroy({
            where: {
                topic_id : id
            }
        });
        if (affectedRows === 0) {
            throw new Error('Resource Not Found');
        }
        return "Successfully Deleted";
    } catch(error: Error) {
        logger.error('An error occurred:', error);
        throw new Error('Internal server error');
    };

    public async updateTopic(id: number, updates: Object) {
        try {
            const [affectedRows] = await Topic.update(updates, {
                where: {
                    topic_id : id,
                },
            });
            if (affectedRows === 0) {
                throw new Error(`Resources Not Found`);
            }
            return "Successfully Updated";
        } catch (error) {
            logger.error('An error occurred:', error);
            throw new Error('Internal server error');
        };
    };
}

export default TopicService;