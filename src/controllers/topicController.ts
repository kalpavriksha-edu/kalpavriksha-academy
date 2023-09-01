import { Request, Response } from 'express';
import Topic from "../model/topicModel";
import TopicServic from '../service/topicService';
import { responseGenerator } from '../utility/responseGenerator';
import logger from '../utility/logger';
import successEnums from "../constants/successConstant"

const topicService = new TopicServic();

class TopicController {
    public async getTopics(req: Request, res: Response) {
        try {
            const topics = await topicService.getTopic();
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, topics);
        } catch (error) {
            logger.error('An error occurred:', error.message);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async getTopicById(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const topic = await topicService.getTopicById(id);
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, topic);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
    public async getTopicByID(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const topic = await topicService.getTopicById(id);
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, topic);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
    public async getTopicByCouser(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const topic = await topicService.getTopicByCourseId(id);
            return responseGenerator.getSuccessResponse(res, successEnums.FETCHED, topic);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
    public async createTopic(req: Request, res: Response) {
        const { name, topic_id , video_link , created_by } = req.body;
        try {
            const topic = await topicService.createTopic(name,topic_id,video_link, created_by);
            return responseGenerator.getSuccessResponse(res, successEnums.CREATED, topic);
        } catch (error: any) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    };

    public async deleteTopic(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await topicService.deleteTopic(id);
            return responseGenerator.getSuccessResponse(res,successEnums.DELETE_SUCCESS);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };

    public async updatetTopic(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await topicService.updateTopic(id, req.body);
            return responseGenerator.getSuccessResponse(res, successEnums.UPDATE_SUCCESS);
        } catch (error) {
            logger.error('An error occurred:', error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    };
}

export const topicController = new TopicController();
