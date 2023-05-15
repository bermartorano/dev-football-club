import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { body: { email, password } } = req;
    const result = await LoginService.login(email, password);
    return res.status(200).json({ token: result });
  }
}
