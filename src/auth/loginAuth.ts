import { Request, Response } from 'express';
import { verify, Secret, VerifyErrors } from 'jsonwebtoken';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

class LoginAuth{
  private secretKey: Secret;

  constructor(secretKey: Secret) {
    this.secretKey = secretKey;
  }

  private generateErrorResponse(res: Response, message: string) {
    return res.json({
      success: 0,
      message: message,
    });
  }

  authenticate(req: Request, res: Response) {
    const token: string | string[] | undefined = req.get('authorization');

    if (token) {
      const tokenString = typeof token === 'string' ? token : token[0];
      const tokenValue = tokenString.slice(7);

      verify(tokenValue, this.secretKey, (err: VerifyErrors | null, decoded: object | undefined | string) => {
        if (err) {
          this.generateErrorResponse(res, 'Invalid token');
        } else {
          res.json({
            success: 1,
            message: 'Authorized access',
            userData: decoded,
          });
        }
      });
    } else {
      this.generateErrorResponse(res, 'Access denied!! Unauthorized user');
    }
  }
}

export default LoginAuth;
