import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.getLeaderBoardHome);
leaderBoardRouter.get('/away', LeaderBoardController.getLeaderBoardAway);
leaderBoardRouter.get('/', LeaderBoardController.getLeaderBoardAll);

export default leaderBoardRouter;
