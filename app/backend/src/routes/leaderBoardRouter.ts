import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.getLeaderBoardHome);

export default leaderBoardRouter;
