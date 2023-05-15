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

  static async getMatchesFilteredByProgress(inProgress: boolean) {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    return matches;
  }

  static async finishMatch(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }
}
