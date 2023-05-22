import { Auditorium, PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(2, 'days').toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    ticketType = await prisma.ticketType.create({
      data: {
        name: 'Presencial',
        price: 250,
        isRemote: false,
        includesHotel: false,
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Online',
        price: 100,
        isRemote: true,
        includesHotel: false,
      },
    });
    await prisma.ticketType.create({
      data: {
        name: 'Presencial',
        price: 600,
        isRemote: false,
        includesHotel: true,
      },
    });
  }
  console.log({ event });

  let firstHotel = await prisma.hotel.findFirst();
  if (!firstHotel) {
    firstHotel = await prisma.hotel.create({
      data: {
        name: 'Driven Resort',
        image: 'https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg',
      },
    });
    const secondHotel = await prisma.hotel.create({
      data: {
        name: 'Driven Palace',
        image: 'https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768',
      },
    });
    const thirdHotel = await prisma.hotel.create({
      data: {
        name: 'Driven World',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw8AfwyOC6aO5DnmwWvnA9_ohB_cpK7QSQpg&usqp=CAU',
      },
    });
    await prisma.room.create({
      data: {
        name: '101',
        capacity: 1,
        hotelId: firstHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '102',
        capacity: 2,
        hotelId: firstHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '103',
        capacity: 3,
        hotelId: firstHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '101',
        capacity: 2,
        hotelId: secondHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '102',
        capacity: 2,
        hotelId: secondHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '103',
        capacity: 3,
        hotelId: secondHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '101',
        capacity: 3,
        hotelId: thirdHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '102',
        capacity: 3,
        hotelId: thirdHotel.id,
      },
    });
    await prisma.room.create({
      data: {
        name: '103',
        capacity: 3,
        hotelId: thirdHotel.id,
      },
    });
  }

  let firstAuditorium = await prisma.auditorium.findFirst();
  let secondAuditorium;
  let thirdAuditorium;
  if (!firstAuditorium) {
    firstAuditorium = await prisma.auditorium.create({
      data: {
        name: 'Auditório Principal',
      },
    });
    secondAuditorium = await prisma.auditorium.create({
      data: {
        name: 'Auditório Lateral',
      },
    });
    thirdAuditorium = await prisma.auditorium.create({
      data: {
        name: 'Sala de Workshop',
      },
    });
  }

  let activitie = await prisma.activitie.findFirst();
  if (!activitie) {
    activitie = await prisma.activitie.create({
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
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'LoL: montando o PC ideal',
        startTime: '2023-01-01T10:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 20,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'Elden Ring: montando o PC ideal',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 20,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: secondAuditorium.id,
        eventId: event.id,
        name: 'Minecraft: como jogar',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 15,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: thirdAuditorium.id,
        eventId: event.id,
        name: 'Minecraft: gameplay',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T10:00:00Z',
        capacity: 10,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: thirdAuditorium.id,
        eventId: event.id,
        name: 'LoL: gameplay',
        startTime: '2023-01-01T10:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 10,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: thirdAuditorium.id,
        eventId: event.id,
        name: 'Elden Ring: gameplay',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 1,
        date: dayjs().toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'Minecraft: montando o PC ideal',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T10:00:00Z',
        capacity: 20,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'LoL: montando o PC ideal',
        startTime: '2023-01-01T10:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 20,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'Elden Ring: montando o PC ideal',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 20,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: secondAuditorium.id,
        eventId: event.id,
        name: 'Minecraft: como jogar',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 15,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: secondAuditorium.id,
        eventId: event.id,
        name: 'Dota: como jogar',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T10:00:00Z',
        capacity: 10,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: thirdAuditorium.id,
        eventId: event.id,
        name: 'Elden Ring: gameplay',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 1,
        date: dayjs().add(1, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: firstAuditorium.id,
        eventId: event.id,
        name: 'Dark Souls: montando o PC ideal',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 20,
        date: dayjs().add(2, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: secondAuditorium.id,
        eventId: event.id,
        name: 'Dark Souls: como jogar',
        startTime: '2023-01-01T09:00:00Z',
        endTime: '2023-01-01T11:00:00Z',
        capacity: 15,
        date: dayjs().add(2, 'days').toDate(),
      },
    });
    await prisma.activitie.create({
      data: {
        auditoriumId: thirdAuditorium.id,
        eventId: event.id,
        name: 'Dark Souls: gameplay',
        startTime: '2023-01-01T11:00:00Z',
        endTime: '2023-01-01T12:00:00Z',
        capacity: 1,
        date: dayjs().add(2, 'days').toDate(),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
