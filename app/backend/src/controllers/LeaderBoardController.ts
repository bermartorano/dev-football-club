import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getLeaderBoardHome(_req: Request, _res: Response) {
    await LeaderBoardService.getLeaderBoardHome();
  }
}
