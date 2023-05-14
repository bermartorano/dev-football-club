import TeamModel, { TeamAttributes } from '../database/models/Team';

class TeamService {
  static async getAllTeams(): Promise<TeamAttributes[]> {
    const allTeams = await TeamModel.findAll();
    return allTeams;
  }
}

export default TeamService;
