import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const verifyAuthToken = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const authorizationHeader = req.headers.authorization as unknown as string;
    console.log(authorizationHeader);
    const token = authorizationHeader?.split(' ')[1] as unknown as string;
    jwt.verify(token, process.env.TOKEN_SECRET as unknown as string);
    next();
  } catch (err) {
    _res.status(400).send('Invalid token343');
  }
};

export default verifyAuthToken;
