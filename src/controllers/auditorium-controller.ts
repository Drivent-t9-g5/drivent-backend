import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import auditoriumService from '@/services/auditorium-service';

export async function getAuditorium(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const activities = await auditoriumService.getAuditorium();
    return res.status(200).send(activities);
  } catch (e) {
    console.log(e);
    next(e);
  }
}
