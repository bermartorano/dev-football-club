abstract class Team {
  private _totalGames = { home: 0, away: 0 };
  private _totalVictories = { home: 0, away: 0 };
  private _totalDraws = { home: 0, away: 0 };
  private _totalLosses = { home: 0, away: 0 };
  private _goalsFavor = { home: 0, away: 0 };
  private _goalsOwn = { home: 0, away: 0 };
  private _goalsBalance = { home: 0, away: 0 };
  private _efficiency = { home: '0.00', away: '0.00' };

  constructor(private _name: string) {
  }

  get name() {
    return this._name;
  }

  getTotalGames(param: 'home' | 'away') {
    return this._totalGames[param];
  }

  getTotalVictories(param: 'home' | 'away') {
    return this._totalVictories[param];
  }

  getTotalDraws(param: 'home' | 'away') {
    return this._totalDraws[param];
  }

  getTotalLosses(param: 'home' | 'away') {
    return this._totalLosses[param];
  }

  getGoalsFavor(param: 'home' | 'away') {
    return this._goalsFavor[param];
  }

  getGoalsOwn(param: 'home' | 'away') {
    return this._goalsOwn[param];
  }

  getGoalsBalance(param: 'home' | 'away') {
    return this._goalsBalance[param];
  }

  getEfficiency(param: 'home' | 'away') {
    return this._efficiency[param];
  }
}

export default Team;
