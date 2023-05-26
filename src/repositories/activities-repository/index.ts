import { Activitie, Subscription } from '@prisma/client';
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

async function findActivitieById(id: number) {
  return prisma.activitie.findFirst({
    where: {
      id,
    },
  });
}

async function findSubscriptionsByUserId(userId: number): Promise<(Subscription & { Activitie: Activitie })[]> {
  return prisma.subscription.findMany({
    where: {
      userId,
    },
    include: {
      Activitie: true,
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
  findActivitieById,
  findSubscriptionsByUserId,
  createSubscription,
  decreaseCapacity,
};

export default activitiesRepository;
