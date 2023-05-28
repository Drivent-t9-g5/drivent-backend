import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activities-service';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response> {
  const { userId } = req;
  try {
    await activitiesService.isPermitedAcessActivities(userId);
    const activities = await activitiesService.getActivities();
    return res.status(200).send(activities);
  } catch (e) {
    next(e);
  }
}

export async function getActivitiesByDay(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const eventId = Number(req.params.eventId);
  const date = String(req.params.date);
  const { userId } = req;
  try {
    await activitiesService.isPermitedAcessActivities(userId);
    const activities = await activitiesService.getActivitiesByDay(eventId, date);
    return res.status(200).send(activities);
  } catch (e) {
    next(e);
  }
}

export async function getSubscriptionsByUserId(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { userId } = req;

  try {
    await activitiesService.isPermitedAcessActivities(userId);
    const subscriptions = await activitiesService.getSubscriptionsByUserId(userId);
    return res.status(200).send(subscriptions);
  } catch (e) {
    next(e);
  }
}

export async function postSubscription(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<Response> {
  const { userId } = req;
  const { activitieId, newCapacity } = req.body as Record<string, number>;

  try {
    await activitiesService.isPermitedAcessActivities(userId);
    await activitiesService.postSubscription(userId, activitieId, newCapacity);
    return res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}
