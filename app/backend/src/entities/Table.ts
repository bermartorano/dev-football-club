import Match from './MatchEntities/Match';
import Team from './TeamEntities/Team';

export default class Table {
  constructor(private _teams: Team[]) {
  }

  registerMatchToTable(matches: Match[]) {
    matches.forEach(({ homeTeam, homeTeamGoals, awayTeam, awayTeamGoals }) => {
      const homeTeamClass = this.teams.find((team) => team.name === homeTeam.teamName);
      const awayTeamClass = this.teams.find((team) => team.name === awayTeam.teamName);
      if (!homeTeamClass || !awayTeamClass) throw new Error('Teams not found');
      homeTeamClass.registerMatch({
        goalsScored: homeTeamGoals, goalsOwn: awayTeamGoals, homeOrAway: 'home' });
      awayTeamClass.registerMatch({
        goalsScored: awayTeamGoals, goalsOwn: homeTeamGoals, homeOrAway: 'away' });
    });
  }

  get teams() {
    return this._teams;
  }
}
