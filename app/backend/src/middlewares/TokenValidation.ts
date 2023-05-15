import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../utils/auth';

export default class TokenValidation {
  static isTokenValid(req: Request, res: Response, next: NextFunction) {
    const { headers: { authorization: token } } = req;
    if (!token) res.status(401).json({ message: 'Token not found' });
    try {
      // Eu já estou conferindo se 'token' é undefined nas linhas acima.
      verifyToken(token as string);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
