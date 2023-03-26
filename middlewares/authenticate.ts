import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authToken = req.header("x-auth-token");
    const decoded = jwt.verify(authToken!, process.env.JWT_SECRET!);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).send();
  }
};

export default { authenticate };
