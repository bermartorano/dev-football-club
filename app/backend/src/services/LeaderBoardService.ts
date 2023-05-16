import MatchService from './MatchService';

export default class LeaderBoardService {
  static async getLeaderBoardHome() {
    const matches = await MatchService.getMatchesFilteredByProgress(false);
    console.log(matches);
  }
}
