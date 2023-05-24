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
