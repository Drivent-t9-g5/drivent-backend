import { TicketStatus, TicketType } from '@prisma/client';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';

export async function createActivitie() {
  const event = await prisma.event.create({
    data: {
      title: 'Driven.t',
      logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
      backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
      startsAt: dayjs().toDate(),
      endsAt: dayjs().add(2, 'days').toDate(),
    },
  });
  const firstAuditorium = await prisma.auditorium.create({
    data: {
      name: 'Auditório Principal',
    },
  });
  const activitie = await prisma.activitie.create({
    data: {
      auditoriumId: firstAuditorium.id,
      eventId: event.id,
      name: 'Minecraft: montando o PC ideal',
      startTime: '2023-01-01T09:00:00Z',
      endTime: '2023-01-01T10:00:00Z',
      capacity: 20,
      date: dayjs().toDate(),
    },
  });

  return { eventId: event.id, auditoriumId: firstAuditorium.id, activitie };
}

export function returnActivitie() {
  return {
    id: faker.datatype.number(),
    auditoriumId: faker.datatype.number(),
    eventId: faker.datatype.number(),
    name: faker.lorem.words(3),
    startTime: faker.date.future(),
    endTime: faker.date.future(),
    capacity: faker.datatype.number(),
    date: dayjs().toDate(),
  };
}
export function returnUser() {
  return {
    id: faker.datatype.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  };
}

export function returnSubscription() {
  return {
    id: faker.datatype.number(),
    activitieId: faker.datatype.number(),
    Activitie: [returnActivitie()],
    userId: faker.datatype.number(),
  };
}
