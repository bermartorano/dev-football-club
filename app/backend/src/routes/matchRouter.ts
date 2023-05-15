import { Router } from 'express';
import MatchController from '../controllers/MatchController';
import TokenValidation from '../middlewares/TokenValidation';

const matchRouter = Router();

matchRouter.get('/', MatchController.getMatchesFilteredOrNot);
matchRouter.patch('/:id/finish', TokenValidation.isTokenValid, MatchController.finishMatch);

export default matchRouter;
