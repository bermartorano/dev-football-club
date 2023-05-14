import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async getAllTeams(_req: Request, res: Response) {
    const allTeams = await TeamService.getAllTeams();
    console.log('oi', allTeams);
    return res.status(200).json(allTeams);
  }
}

export default TeamController;
