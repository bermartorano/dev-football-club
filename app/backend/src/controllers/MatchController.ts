import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getAllMatches(_req: Request, res: Response) {
    const matches = await MatchService.getAllMatches();
    return res.status(200).json(matches);
  }
}
