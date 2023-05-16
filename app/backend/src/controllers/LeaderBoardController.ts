import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  static async getLeaderBoardHome(_req: Request, res: Response) {
    const leaderBoardHome = await LeaderBoardService.getLeaderBoard('home');
    return res.json(leaderBoardHome);
  }

  static async getLeaderBoardAway(_req: Request, res: Response) {
    const leaderBoardHome = await LeaderBoardService.getLeaderBoard('away');
    return res.json(leaderBoardHome);
  }

  static async getLeaderBoardAll(_req: Request, res: Response) {
    const leaderBoardHome = await LeaderBoardService.getLeaderBoard('all');
    return res.json(leaderBoardHome);
  }
}
