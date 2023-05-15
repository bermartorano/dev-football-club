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
}
