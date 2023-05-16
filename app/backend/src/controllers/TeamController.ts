import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async getAllTeams(_req: Request, res: Response) {
    const allTeams = await TeamService.getAllTeams();
    return res.status(200).json(allTeams);
  }

  static async getTeamById(req:Request, res: Response) {
    const { params: { id } } = req;
    const team = await TeamService.getTeamById(Number(id));
    return res.status(200).json(team);
  }
}

export default TeamController;
