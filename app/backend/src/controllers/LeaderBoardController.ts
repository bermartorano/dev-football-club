import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getLeaderBoardHome(_req: Request, res: Response) {
    const leaderBoardHome = await LeaderBoardService.getLeaderBoardHome();
    return res.json(leaderBoardHome);
  }
}
