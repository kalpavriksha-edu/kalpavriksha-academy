import { type Request, type Response } from "express"
import { responseGenerator } from "../utility/responseGenerator"
import AssignmentService from "../service/assignmentService"
import loggerManager from "../utility/logger"
import successEnums from "../constants/successConstant"
import { log } from "winston"

const logger = loggerManager.getLogger();
const assignmentService = new AssignmentService();

class AssignmentController {
    public async getAssignments(req: Request, res: Response) {
        try {
            const assignments = await assignmentService.getAssignments();
            return responseGenerator.getSuccessResponse(res, successEnums.COURSE_FETCHED, assignments);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    }

    public async getAssignmentById(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            const assignment = await assignmentService.getAssignmentById(id);
            return responseGenerator.getSuccessResponse(res, successEnums.COURSE_FETCHED, assignment);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }

    public async createAssignment(req: Request, res: Response) {
        const { name, description, max_score, created_by, topic_id } = req.body;
        try {
            const assignment = await assignmentService.createAssignment(name, description, max_score, created_by, topic_id);
            return responseGenerator.getSuccessResponse(res, successEnums.COURSE_CREATED, assignment);
        } catch (error: any) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 500);
        }
    }

    public async deleteAssignment(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await assignmentService.deleteAssignment(id);
            return responseGenerator.getSuccessResponse(res, successEnums.DELETE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }

    public async updateAssignment(req: Request, res: Response) {
        const id: number = req.params.id;
        try {
            await assignmentService.updateAssignment(id, req.body);
            return responseGenerator.getSuccessResponse(res, successEnums.UPDATE_SUCCESS);
        } catch (error) {
            logger.error(error);
            return responseGenerator.getErrorResponse(res, 404);
        }
    }
}

const assignmentController = new AssignmentController();
export default assignmentController;
