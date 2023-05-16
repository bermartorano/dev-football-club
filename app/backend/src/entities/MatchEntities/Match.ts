interface Match {
  homeTeam: { teamName: string },
  awayTeam: { teamName: string },
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
}

export default Match;
