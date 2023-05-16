import NotFoundError from '../errorClasses.ts/NotFoundError';
import TeamModel, { TeamAttributes } from '../database/models/Team';

class TeamService {
  static async getAllTeams(): Promise<TeamAttributes[]> {
    const allTeams = await TeamModel.findAll();
    const allTeamsValues = allTeams.map((team) => team.dataValues);
    return allTeamsValues;
  }

  static async getTeamById(id: number): Promise<TeamAttributes> {
    const foundTeam = await TeamModel.findByPk(id);
    if (!foundTeam) throw new NotFoundError('Team not found');
    return foundTeam.toJSON();
  }
}

export default TeamService;
