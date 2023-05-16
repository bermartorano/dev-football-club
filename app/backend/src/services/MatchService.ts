import { Op } from 'sequelize';
import MatchCreationalAtt from '../entities/MatchEntities/MatchCreationalAtt';
import TeamModel from '../database/models/Team';
import MatchModel, { MatchAttributes } from '../database/models/Match';
import UnprocessableError from '../errorClasses.ts/UnprocessableError';
import NotFoundError from '../errorClasses.ts/NotFoundError';

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

  static async getMatchesFilteredByProgress(inProgress: boolean): Promise<MatchAttributes[]> {
    const matches = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });

    const matchesValues = matches.map((match) => match.dataValues);
    const matchValuesWithTeams = matchesValues.map((match) => {
      if (!match.homeTeam || !match.awayTeam) throw new Error('Inconsistency in the Database');
      const newMatch = {
        ...match,
        homeTeam: { teamName: match.homeTeam.teamName },
        awayTeam: { teamName: match.awayTeam.teamName },
      };
      return newMatch;
    });

    return matchValuesWithTeams;
  }

  static async finishMatch(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }

  static async alterScore(id: number, score: { homeTeamGoals: number, awayTeamGoals: number }) {
    const { homeTeamGoals, awayTeamGoals } = score;
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async registerMatch(matchInfo: MatchCreationalAtt) {
    if (matchInfo.awayTeamId === matchInfo.homeTeamId) {
      throw new UnprocessableError('It is not possible to create a match with two equal teams');
    }
    const teams = await TeamModel.findAll({
      where: {
        id: {
          [Op.or]: [matchInfo.awayTeamId, matchInfo.homeTeamId],
        },
      },
    });
    if (teams.length !== 2) throw new NotFoundError('There is no team with such id!');
    // console.log('********* times encontrados: ', teams);
    const result = await MatchModel.create({ ...matchInfo, inProgress: true });
    return result;
    // return { teste: 'oi' };
  }
}
