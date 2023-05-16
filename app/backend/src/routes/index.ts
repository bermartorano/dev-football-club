import { Router } from 'express';
import teamRouter from './teamRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';
import leaderBoardRouter from './leaderBoardRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
