import { Router } from 'express';
import { getAuditorium } from '@/controllers/auditorium-controller';
import { authenticateToken } from '@/middlewares';

const auditoriumRouter = Router();

auditoriumRouter.all('/*', authenticateToken).get('/', getAuditorium);

export { auditoriumRouter };
