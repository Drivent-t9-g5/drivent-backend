import hotelRepository from '@/repositories/hotel-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import ticketsRepository from '@/repositories/tickets-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import { badRequestError } from '@/errors/bad-request-error';

async function listHotels(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw badRequestError();
  }
  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === 'RESERVED') {
    throw unauthorizedError();
  }
  if (ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw notFoundError();
  }
}

async function getHotels(userId: number) {
  await listHotels(userId);

  const hotels = await hotelRepository.findHotels();
  if (!hotels || hotels.length === 0) {
    throw notFoundError();
  }
  return hotels;
}

async function getHotelById(hotelId: number) {
  const hotel = await hotelRepository.findHotelById(hotelId);
  if (!hotel) throw notFoundError();
  return hotel;
}

async function getHotelsWithRooms(userId: number, hotelId: number) {
  await listHotels(userId);

  const hotel = await hotelRepository.findRoomsByHotelId(hotelId);

  if (!hotel) {
    throw notFoundError();
  }
  const rooms = hotel.Rooms.map((room) => {
    const bookedCount = room.Booking?.length || 0;
    const availableCount = room.capacity - bookedCount;
    return {
      id: room.id,
      name: room.name,
      available: availableCount,
      reserved: bookedCount,
    };
  });
  return rooms;
}

export default {
  getHotels,
  getHotelById,
  getHotelsWithRooms,
  listHotels,
};
