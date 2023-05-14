import NotFoundError from '../errorClasses.ts/NotFoundError';
import TeamModel, { TeamAttributes } from '../database/models/Team';

class TeamService {
  static async getAllTeams(): Promise<TeamAttributes[]> {
    const allTeams = await TeamModel.findAll();
    return allTeams;
  }

  static async getTeamById(id: number): Promise<TeamAttributes> {
    const foundTeam = await TeamModel.findByPk(id);
    if (!foundTeam) throw new NotFoundError('Team not found');
    return foundTeam.toJSON();
  }
}

export default TeamService;
