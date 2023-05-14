import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const teamRouter = Router();

teamRouter.get('/', TeamController.getAllTeams);

export default teamRouter;
