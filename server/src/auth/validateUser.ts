import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';

export const validateUser = (req: any, res: Response, next: NextFunction) => {
  const user = req['currentUser'];

  if (!user) {
    return res.status(httpStatus.UNAUTHORIZED).send();
  }

  next();
};
