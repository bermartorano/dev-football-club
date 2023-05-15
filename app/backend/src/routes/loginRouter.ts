import { Router } from 'express';
import LoginController from '../controllers/LoginController';
import TokenValidation from '../middlewares/TokenValidation';

const loginRouter = Router();

loginRouter.post('/', LoginController.login);
loginRouter.get('/role', TokenValidation.isTokenValid, LoginController.getRole);

export default loginRouter;
