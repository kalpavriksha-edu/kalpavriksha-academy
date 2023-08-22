import { type Response } from "express"

type Messages = Record<number, string>

class ResponseGenerator {
    private readonly messages: Messages = {
        200: "OK",
        400: "Bad Request: The request was malformed.",
        404: "Resource not found",
        500: "Internal Server Error",
    }
    public getErrorResponse(res: Response, errorCode: number) {
        const response = {
            error_code: errorCode,
            error_message: this.messages[errorCode]
        }
        return res.json(response);
    };

    public getSuccessResponse(res: Response, message: { message: string }, data?: any) {
        const response = { message, data };
        return res.status(200).json(response);
    };
}

export const responseGenerator = new ResponseGenerator();


