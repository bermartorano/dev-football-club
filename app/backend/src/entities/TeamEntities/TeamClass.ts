import HomeAwayAll from './HomeAwayAll';
import InfoToTeamRegister from './InfoToTeamRegister';

class TeamClass {
  private _totalGames = { home: 0, away: 0 };
  private _totalPoints = { home: 0, away: 0 };
  private _totalVictories = { home: 0, away: 0 };
  private _totalDraws = { home: 0, away: 0 };
  private _totalLosses = { home: 0, away: 0 };
  private _goalsFavor = { home: 0, away: 0 };
  private _goalsOwn = { home: 0, away: 0 };
  private _goalsBalance = { home: 0, away: 0 };
  private _efficiency = { home: 0.00, away: 0.00 };

  constructor(private _name: string) {
  }

  registerMatch({ goalsScored, goalsOwn, homeOrAway }: InfoToTeamRegister) {
    // atualizar total de jogos,
    this._totalGames[homeOrAway] += 1;
    // atualizar vitória/derrota/empate
    // atualizar pontos
    const goalBalance = goalsScored - goalsOwn;
    this.updateVicDrLosPoints(goalBalance, homeOrAway);
    // atualizar gols feitos
    this._goalsFavor[homeOrAway] += goalsScored;
    // atualizar gols sofridos
    this._goalsOwn[homeOrAway] += goalsOwn;
    // atualizar balanço de gols
    this._goalsBalance[homeOrAway] = this._goalsFavor[homeOrAway] - this._goalsOwn[homeOrAway];
    // atualizar eficiencia
    this.updateEfficiency(homeOrAway);
  }

  private updateEfficiency(homeOrAway: 'home' | 'away') {
    const points = this._totalPoints[homeOrAway];
    const totalGames = this._totalGames[homeOrAway];
    // this._efficiency[homeOrAway] = (points / (totalGames * 3)) * 100;
    const eff = (points / (totalGames * 3)) * 100;
    this._efficiency[homeOrAway] = Number(eff.toFixed(2));
  }

  private updateVicDrLosPoints(goalBalance: number, homeOrAway: 'home' | 'away') {
    if (goalBalance > 0) {
      this._totalVictories[homeOrAway] += 1;
      this._totalPoints[homeOrAway] += 3;
    }
    if (goalBalance === 0) {
      this._totalDraws[homeOrAway] += 1;
      this._totalPoints[homeOrAway] += 1;
    }
    if (goalBalance < 0) this._totalLosses[homeOrAway] += 1;
  }

  get name() {
    return this._name;
  }

  getTotalGames(param: HomeAwayAll) {
    if (param === 'all') return this._totalGames.home + this._totalGames.away;
    return this._totalGames[param];
  }

  getTotalVictories(param: HomeAwayAll) {
    if (param === 'all') return this._totalVictories.home + this._totalVictories.away;
    return this._totalVictories[param];
  }

  getTotalDraws(param: HomeAwayAll) {
    if (param === 'all') return this._totalDraws.home + this._totalDraws.away;
    return this._totalDraws[param];
  }

  getTotalLosses(param: HomeAwayAll) {
    if (param === 'all') return this._totalLosses.home + this._totalLosses.away;
    return this._totalLosses[param];
  }

  getGoalsFavor(param: HomeAwayAll) {
    if (param === 'all') return this._goalsFavor.home + this._goalsFavor.away;
    return this._goalsFavor[param];
  }

  getGoalsOwn(param: HomeAwayAll) {
    if (param === 'all') return this._goalsOwn.home + this._goalsOwn.away;
    return this._goalsOwn[param];
  }

  getGoalsBalance(param: HomeAwayAll) {
    if (param === 'all') return this._goalsBalance.home + this._goalsBalance.away;
    return this._goalsBalance[param];
  }

  getEfficiency(param: HomeAwayAll) {
    if (param === 'all') {
      const totalPoints = this._totalPoints.home + this._totalPoints.away;
      const totalGames = this._totalGames.home + this._totalGames.away;
      const result = (totalPoints / (totalGames * 3)) * 100;
      return result;
    }
    return this._efficiency[param];
  }

  getTotalPoints(param: HomeAwayAll) {
    if (param === 'all') return this._totalPoints.home + this._totalPoints.away;
    return this._totalPoints[param];
  }
}

export default TeamClass;
