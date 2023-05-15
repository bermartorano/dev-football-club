import TeamModel from '../database/models/Team';
import MatchModel from '../database/models/Match';

export default class MatchService {
  static async getAllMatches() {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  }
}
