import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function findFirst() {
  const cacheKey = 'event';
  const cacheEvent = await redis.get(cacheKey);

  if (cacheEvent) {
    const event = JSON.parse(cacheEvent);
    if (event) return event;
  }
  const event = await prisma.event.findFirst();

  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
