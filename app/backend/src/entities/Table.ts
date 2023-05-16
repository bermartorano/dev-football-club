import { MatchAttributes } from '../database/models/Match';
import HomeAwayAll from './TeamEntities/HomeAwayAll';
import TeamClass from './TeamEntities/TeamClass';

export default class Table {
  constructor(private _teams: TeamClass[]) {
  }

  registerMatchToTable(matches: MatchAttributes[]) {
    matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
      if (!homeTeam || !awayTeam) throw new Error('Database inconsistency');
      const homeTeamClass = this.teams.find((team) => team.name === homeTeam.teamName);
      const awayTeamClass = this.teams.find((team) => team.name === awayTeam.teamName);
      if (!homeTeamClass || !awayTeamClass) throw new Error('Teams not found');
      homeTeamClass.registerMatch({
        goalsScored: homeTeamGoals, goalsOwn: awayTeamGoals, homeOrAway: 'home' });
      awayTeamClass.registerMatch({
        goalsScored: awayTeamGoals, goalsOwn: homeTeamGoals, homeOrAway: 'away' });
    });
  }

  getOrder(homeOrAwayOrAll: HomeAwayAll) {
    const teamsTable = this.getTableFormatTeams(homeOrAwayOrAll);
    teamsTable.sort((teamA, teamB) => {
      const pointDifferece = teamA.totalPoints - teamB.totalPoints;
      if (pointDifferece > 0) return -1;
      if (pointDifferece < 0) return 1;
      const vicDifference = teamA.totalVictories - teamB.totalVictories;
      if (vicDifference > 0) return -1;
      if (vicDifference < 0) return 1;
      const goalBalanceDiff = teamA.goalsBalance - teamB.goalsBalance;
      if (goalBalanceDiff > 0) return -1;
      if (goalBalanceDiff < 0) return 1;
      const goalsFavorDiff = teamA.goalsFavor - teamB.goalsFavor;
      if (goalsFavorDiff > 0) return -1;
      return 1;
    });
    return teamsTable;
  }

  private getTableFormatTeams(homeAwayAll: HomeAwayAll) {
    const tableFormatTeamsArray = this.teams.map((teamClass) => {
      const tableFormatTeam = {
        name: teamClass.name,
        totalGames: teamClass.getTotalGames(homeAwayAll),
        totalPoints: teamClass.getTotalPoints(homeAwayAll),
        totalVictories: teamClass.getTotalVictories(homeAwayAll),
        totalDraws: teamClass.getTotalDraws(homeAwayAll),
        totalLoses: teamClass.getTotalLosses(homeAwayAll),
        goalsFavor: teamClass.getGoalsFavor(homeAwayAll),
        goalsOwn: teamClass.getGoalsOwn(homeAwayAll),
        goalsBalance: teamClass.getGoalsBalance(homeAwayAll),
        efficiency: teamClass.getEfficiency(homeAwayAll),
      };
      return tableFormatTeam;
    });
    return tableFormatTeamsArray;
  }

  get teams() {
    return this._teams;
  }
}
