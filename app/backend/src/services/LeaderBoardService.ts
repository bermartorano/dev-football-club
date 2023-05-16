import Table from '../entities/Table';
import TeamClass from '../entities/TeamEntities/TeamClass';
import MatchService from './MatchService';
import TeamService from './TeamService';

export default class LeaderBoardService {
  static async getLeaderBoardHome() {
    const matches = await MatchService.getMatchesFilteredByProgress(false);
    const teamsWithId = await TeamService.getAllTeams();
    const teamsWithoutId = teamsWithId.map((teamInfo) => teamInfo.teamName);
    const teamClassArray = teamsWithoutId.map((team) => new TeamClass(team));
    const table = new Table(teamClassArray);
    table.registerMatchToTable(matches);
    console.log('************ TABELA ALL: ', table.getOrder('all'));
  }
}
