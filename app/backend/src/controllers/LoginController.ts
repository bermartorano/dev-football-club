import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { body: { email, password } } = req;
    const result = await LoginService.login(email, password);
    return res.status(200).json({ token: result });
  }

  static async getRole(req: Request, res: Response) {
    const { headers: { authorization: token } } = req;
    // A existência do token já foi conferida pelo Middleware.
    const userRole = LoginService.getRole(token as string);
    return res.status(200).json({ role: userRole });
  }
}
