import activitiesRepository from '@/repositories/activities-repository';

async function getActivities() {
  const activities = await activitiesRepository.findActivities();
  return activities;
}

async function getActivitiesByDay(eventId: number, date: string) {
  const activities = await activitiesRepository.findActivitiesByDate(eventId, date);
  return activities;
}

export default {
  getActivities,
  getActivitiesByDay,
};
