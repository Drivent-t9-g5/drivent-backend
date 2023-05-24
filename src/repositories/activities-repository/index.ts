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
    orderBy: {
      startTime: 'asc',
    },
  });
}

async function findSubscriptionsByUserId(userId: number) {
  return prisma.subscription.findMany({
    where: {
      userId,
    },
  });
}

async function createSubscription(userId: number, activitieId: number) {
  return prisma.subscription.create({
    data: {
      activitieId,
      userId,
    },
  });
}

async function decreaseCapacity(activitieId: number, newCapacity: number) {
  return prisma.activitie.update({
    where: {
      id: activitieId,
    },
    data: {
      capacity: newCapacity,
    },
  });
}

const activitiesRepository = {
  findActivities,
  findActivitiesByDate,
  findSubscriptionsByUserId,
  createSubscription,
  decreaseCapacity,
};

export default activitiesRepository;
