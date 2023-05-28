import faker from '@faker-js/faker';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createPayment,
  createTicketTypeWithHotel,
  createHotel,
  createRoomWithHotelId,
  createActivitie,
} from '../factories';
import { cleanDb, generateValidToken } from '../helpers';

import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activitie', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activitie');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user has no enrollment yet!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 when user ticket does not exists!!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();

      const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 when user ticket was not paid yet!!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 200 when user can see activities ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get('/activitie').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});
describe('GET  activitie/:eventId/:date', () => {
  it('should respond with status 401 if no token is given', async () => {
    const activities = await createActivitie();

    const response = await server.get(`/activitie/${activities.eventId}/${activities.activitie.startTime}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const activities = await createActivitie();

    const response = await server
      .get(`/activitie/${activities.eventId}/${activities.activitie.startTime}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user has no enrollment yet!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const activities = await createActivitie();

      const response = await server
        .get(`/activitie/${activities.eventId}/${activities.activitie.startTime}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 when user ticket does not exists!!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();

      const activities = await createActivitie();

      const response = await server
        .get(`/activitie/${activities.eventId}/${activities.activitie.startTime}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 401 when user ticket was not paid yet!!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const activities = await createActivitie();

      const response = await server
        .get(`/activitie/${activities.eventId}/${activities.activitie.startTime}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
  });
});
describe('GET /activitie/subscriptions', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activitie/subscriptions');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for the given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user has no enrollment yet', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 when user ticket does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();

      const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 when user ticket has not been paid yet', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 200 when user can see subscriptions of activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
    });
  });
});

describe('POST /activitie/subscriptions', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/activitie/subscriptions');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 401 when user has no enrollment yet!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server.post('/activitie/subscriptions').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 when user ticket does not exist!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();

      const requestBody = {
        activityId: 'activityId',
        ticketId: 123,
        extras: ['extra1', 'extra2'],
      };

      const response = await server
        .post('/activitie/subscriptions')
        .set('Authorization', `Bearer ${token}`)
        .send(requestBody);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });

    it('should respond with status 401 when user ticket has not been paid yet!', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

      const requestBody = {
        activityId: 'activityId',
        ticketId: ticket.id,
        extras: ['extra1', 'extra2'],
      };

      const response = await server
        .post('/activitie/subscriptions')
        .set('Authorization', `Bearer ${token}`)
        .send(requestBody);

      expect(response.status).toEqual(httpStatus.UNAUTHORIZED);
    });
    it('should respond with status 200 when user can see subscriptions of activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      const payment = await createPayment(ticket.id, ticketType.price);
      const activitie = await createActivitie();
      const response = await supertest(app)
        .post('/activitie/subscriptions')
        .set('Authorization', `Bearer ${token}`)
        .send({
          activitieId: activitie.activitie.id,
          newCapacity: activitie.activitie.capacity - 1,
        });

      expect(response.status).toEqual(httpStatus.CREATED);
    });
  });
});
