import { Enrollment, Address } from '@prisma/client';
import activityService from '../../src/services/activities-service';
import { returnActivitie, returnSubscription } from '../factories';
import { conflictError, cannotActivitiesError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import activitiesRepository from '@/repositories/activities-repository';

describe('isPermitedAcessActivities function', () => {
  it('should throw cannotActivitiesError if enrollment is not found', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null as any);

    await expect(activityService.isPermitedAcessActivities(userId)).rejects.toEqual(
      cannotActivitiesError('You have to enroll first and buy a ticket to see activities!'),
    );
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
  });

  it('should throw cannotActivitiesError if ticket is not found or has status "RESERVED"', async () => {
    const userId = 1;

    jest
      .spyOn(enrollmentRepository, 'findWithAddressByUserId')
      .mockResolvedValue({} as Enrollment & { Address: Address[] });
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null as any);

    await expect(activityService.isPermitedAcessActivities(userId)).rejects.toEqual(
      cannotActivitiesError('It is necessary to buy a ticket to see activities!'),
    );
    expect(enrollmentRepository.findWithAddressByUserId).toHaveBeenCalledWith(userId);
    expect(ticketsRepository.findTicketByEnrollmentId).toHaveBeenCalledWith(undefined);
  });
});

describe('getActivities function', () => {
  it('should return activities', async () => {
    const activities = returnActivitie();

    jest.spyOn(activitiesRepository, 'findActivities').mockResolvedValue([activities]);

    const result = await activityService.getActivities();

    expect(activitiesRepository.findActivities).toHaveBeenCalled();
    expect(result).toEqual([activities]);
  });
});

describe('getActivitiesByDay function', () => {
  it('should return activities for the given event and date', async () => {
    const eventId = 1;
    const date = '2023-05-27';
    const activities = returnActivitie();

    jest.spyOn(activitiesRepository, 'findActivitiesByDate').mockResolvedValue([activities]);

    const result = await activityService.getActivitiesByDay(eventId, date);

    expect(activitiesRepository.findActivitiesByDate).toHaveBeenCalledWith(eventId, date);
    expect(result).toEqual([activities]);
  });
});

describe('getSubscriptionsByUserId function', () => {
  it('should return subscriptions for the given user id', async () => {
    const userId = 1;
    const subscriptions = returnSubscription();

    jest.spyOn(activitiesRepository, 'findSubscriptionsByUserId').mockResolvedValue([subscriptions]);

    const result = await activityService.getSubscriptionsByUserId(userId);

    expect(activitiesRepository.findSubscriptionsByUserId).toHaveBeenCalledWith(userId);
    expect(result).toEqual([subscriptions]);
  });
});

// describe('postSubscription function', () => {
//   it('should throw conflictError if there is a time conflict with existing subscriptions', async () => {
//     const userId = 1;
//     const activitieId = 1;
//     const newCapacity = 1;
//     const activitie = returnActivitie();
//     const subscriptions = returnSubscription();

//     jest.spyOn(activitiesRepository, 'findActivitieById').mockResolvedValue(activitie);
//     jest.spyOn(activitiesRepository, 'findSubscriptionsByUserId').mockResolvedValue([subscriptions]);

//     await expect(activityService.postSubscription(userId, activitieId, newCapacity)).rejects.toEqual(
//       conflictError('You already have an activity at this time!')
//     );
//     expect(activitiesRepository.findActivitieById).toHaveBeenCalledWith(activitieId);
//     expect(activitiesRepository.findSubscriptionsByUserId).toHaveBeenCalledWith(userId);

//   });
// });
