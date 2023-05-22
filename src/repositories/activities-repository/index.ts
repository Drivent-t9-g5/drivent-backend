import { prisma } from '@/config';

async function findActivities() {
  return prisma.activitie.findMany();
}

async function findActivitiesByDate(eventId: number, date: string) {
  return prisma.activitie.findMany({
    where: {
      eventId,
      date,
    },
  });
}

const activitiesRepository = {
  findActivities,
  findActivitiesByDate,
};

export default activitiesRepository;
