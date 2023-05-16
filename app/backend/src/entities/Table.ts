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

  // getOrder(homeOrAwayOrAll: HomeAwayAll) {
  //   // const tableFormatTeamsArray = this.teams.map((teamClass) => {
  //   //   const tableFormatTeam = {
  //   //     name: teamClass.name;

  //   //   };
  //   // });
  // }

  getTableFormatTeams(homeAwayAll: HomeAwayAll) {
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
        getEfficiency: teamClass.getEfficiency(homeAwayAll),
      };
      return tableFormatTeam;
    });
    return tableFormatTeamsArray;
  }

  get teams() {
    return this._teams;
  }
}
