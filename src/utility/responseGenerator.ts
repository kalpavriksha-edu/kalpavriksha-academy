import { type Response } from "express"
import errorConstant from "../constants/errorConstants";

type Messages = Record<number, string>

class ResponseGenerator {
    private readonly messages: Messages = {
        200: "OK",
        400: "Bad Request: The request was malformed.",
        404: "Resource not found",
        500: "Internal Server Error",
        403: "Invalid Arguments"
    }
    public getErrorResponse(res: Response, errorCode: number) {
        const response = {
            error_code: errorCode,
            error_message: this.messages[errorCode]
        }
        return res.json(response);
    };

    public getError(error: any) {
        if (error.message.includes('Illegal arguments')) {
            return {message:"Illegal arguments",code:403};
          } 
        if (error.message.includes('Resources Not Found')) {
            return {message:"Resources Not Found",code:404};
          } 
        if (error.message.includes('data and hash arguments required')) {
            return {message:" data and hash arguments required",code:400};
          } 
          return {message:"Internal server Error",code:500};
      }

    public getSuccessResponse(res: Response, message: { message: string }, data?: any) {
        const response = { message, data };
        return res.status(200).json(response);
    };
}

export const responseGenerator = new ResponseGenerator();
