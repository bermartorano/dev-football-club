import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchRouter = Router();

matchRouter.get('/', MatchController.getMatchesFilteredOrNot);

export default matchRouter;
