import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  static async getMatchesFilteredOrNot(req: Request, res: Response) {
    const { query: { inProgress } } = req;
    if (inProgress === 'true' || inProgress === 'false') {
      const filterByProgress = inProgress === 'true';
      const matchesFiltered = await MatchService.getMatchesFilteredByProgress(filterByProgress);
      return res.json(matchesFiltered);
    }
    const matches = await MatchService.getAllMatches();
    return res.status(200).json(matches);
  }

  static async finishMatch(req: Request, res: Response) {
    const { params: { id: matchId } } = req;
    await MatchService.finishMatch(Number(matchId));
    return res.json({ message: 'Finished' });
  }

  static async alterScore(req: Request, res: Response) {
    const { body, params: { id: matchId } } = req;
    await MatchService.alterScore(Number(matchId), body);
    return res.json({ message: 'Score successfully changed' });
  }

  static async registerMatch(req: Request, res: Response) {
    const { body } = req;
    const matchRegistered = await MatchService.registerMatch(body);
    return res.status(201).json(matchRegistered);
  }
}
