import { prisma } from '@/config';

async function getAuditorium() {
  return prisma.auditorium.findMany();
}

const auditoriumRepository = {
  getAuditorium,
};

export default auditoriumRepository;
