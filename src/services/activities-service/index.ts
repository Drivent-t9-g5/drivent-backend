import { conflictError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  return activities;
}

async function getActivitiesByDay(eventId: number, date: string) {
  const activities = await activitiesRepository.findActivitiesByDate(eventId, date);
  return activities;
}

async function getSubscriptionsByUserId(userId: number) {
  const subscriptions = await activitiesRepository.findSubscriptionsByUserId(userId);
  return subscriptions;
}

async function postSubscription(userId: number, activitieId: number, newCapacity: number) {
  const activitie = await activitiesRepository.findActivitieById(activitieId);
  const subscriptions = await activitiesRepository.findSubscriptionsByUserId(userId);

  if (activitie && subscriptions.length !== 0) {
    for (let i = 0; i < subscriptions.length; i++) {
      const currentActivitieDate = new Date(subscriptions[i].Activitie.date);
      const currentActivitieStartTime = new Date(subscriptions[i].Activitie.startTime);
      const currentActivitieEndTime = new Date(subscriptions[i].Activitie.endTime);
      const newActivitieDate = new Date(activitie.date);
      const newActivitieStartTime = new Date(activitie.startTime);
      const newActivitieEndTime = new Date(activitie.endTime);
      const sameDate =
        currentActivitieDate.toISOString().substring(0, 10) === newActivitieDate.toISOString().substring(0, 10);

      if (
        sameDate &&
        currentActivitieStartTime < newActivitieEndTime &&
        currentActivitieEndTime > newActivitieStartTime
      ) {
        throw conflictError('Horários das atividades coincidem');
      }
    }
  }

  await activitiesRepository.decreaseCapacity(activitieId, newCapacity);

  const subscription = await activitiesRepository.createSubscription(userId, activitieId);
  return subscription;
}

export default {
  getActivities,
  getActivitiesByDay,
  getSubscriptionsByUserId,
  postSubscription,
};
