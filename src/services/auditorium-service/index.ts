import auditoriumRepository from '@/repositories/auditorium-repository';

async function getAuditorium() {
  const auditorium = await auditoriumRepository.getAuditorium();
  return auditorium;
}

export default {
  getAuditorium,
};
