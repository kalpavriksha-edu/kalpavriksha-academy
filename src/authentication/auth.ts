import { Request, Response, NextFunction } from "express";
import { verify, Secret, VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import errorConstant from "../constants/errorConstants";

dotenv.config();

export default class Authorization {
  public tokenValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ){
    let token: string | string[] | undefined = req.get("authorization");
    if (token) {
      if (typeof token !== "string") {
        token = token[0];
      }
      token = token.slice(7);
      verify(
        token,
        process.env.KEY,
        (err: VerifyErrors | null, decoded: object | undefined | string) => {
          if (err) {
            res.status(403).json({
              success: false,
              message: errorConstant.INVALID_TOKEN,
            });
          } else {
            next();
          }
        }
      );
    } else {
      res.status(403).json({
        success: false,
        message: errorConstant.UNAUTH_USER,
      });
    }
  };

  public roleValidation(Role: String) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token = req.get("authorization");
      if (token) {
        const tokenParts = token.split(".");
        if (tokenParts.length === 3) {
          try {
            const base64Url = tokenParts[1];
            const decodedValue = JSON.parse(
              Buffer.from(base64Url, "base64").toString()
            );
            if (decodedValue.user.role !== Role) {
              res.status(401);
              return res.json({
                sucsess: false,
                message: errorConstant.UNAUTH_USER
              })
            }

            next();
          } catch (err) {
            console.error(err);
            res.status(403).json({
              success: false,
              message: errorConstant.INVALID_TOKEN,
            });
          }
        } else {
          res.status(403).json({
            success: false,
            message: errorConstant.INVALID_TOKEN,
          });
        }
      } else {
        res.status(403).json({
          success: false,
          message: errorConstant.UNAUTH_USER,
        });
      }
    };
  }
}
