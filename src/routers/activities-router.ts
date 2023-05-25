import { Router } from 'express';
import { getActivities, getActivitiesByDay, getSubscriptionsByUserId, postSubscription } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .get('/:eventId/:date', getActivitiesByDay)
  .get('/subscriptions', getSubscriptionsByUserId)
  .post('/subscriptions', postSubscription);

export { activitiesRouter };
