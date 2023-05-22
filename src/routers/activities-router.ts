import { Router } from 'express';
import { getActivities, getActivitiesByDay } from '@/controllers';
import { authenticateToken } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivities).get('/:eventId/:date', getActivitiesByDay);

export { activitiesRouter };
