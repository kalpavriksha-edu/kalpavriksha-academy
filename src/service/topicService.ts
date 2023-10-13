import Topic from "../model/topicModel";
import logger from '../utility/logger';
import errorEnums from "../constants/errorConstants"
import successEnums from "../constants/successConstant"



class TopicService {
    

    public async getTopic() {
        try {
            const topic = await Topic.findAll();
            return topic;
        } catch (error) {
            logger.error(error.message);
            logger.error(errorEnums.INT_SERVER_ERR);
        }
    };

    public async getTopicById(id: number) {
        const topic = await Topic.findByPk(id);
        if (!topic) {
            logger.error(errorEnums.ERR_INVALID_INPUT);
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
            logger.error(errorEnums.INT_SERVER_ERR);
        }
    };

    public async deleteTopic(id: number) 
    {
        try
        {
            const affectedRows = await Topic.destroy({
                where: {
                    topic_id : id
                }
            });
            if (affectedRows === 0) {
                throw new Error();
            }
            return successEnums.DELETE_SUCCESS;
        }
        catch (error) {
            logger.error(error);
            logger.error(errorEnums.INT_SERVER_ERR);
        };
    }

    public async updateTopic(id: number, updates: Object) {
        try {
            const [affectedRows] = await Topic.update(updates, {
                where: {
                    course_id: id
                }
            })
            if (affectedRows === 0) {
                logger.error(errorEnums.ERR_INVALID_INPUT);
            }
            return successEnums.UPDATE_SUCCESS;
        } catch (error) {
            logger.error(error);
            logger.error(errorEnums.INT_SERVER_ERR);
        }
        }
    }


export default TopicService;
