import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt.helper';
import { User } from '../models/user.model';

export const verifyAuthToken = (role: 'ADMIN' | 'USER') => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
    try {
      const decoded = (await verifyToken({ token: token as string })) as { id: string };

      const user = await User.findOne({ id: decoded.id });
      if (role && user?.role !== role) {
        return res.status(403).send({ message: 'Unauthorized' });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.log('error: ', error);
      return res.status(401).send({ message: 'Invalid token' });
    }
  };
};
