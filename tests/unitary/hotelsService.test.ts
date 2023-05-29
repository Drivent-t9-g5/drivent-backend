import {
  enrollmentWithAddressReturn,
  findTicketByEnrollmentIdReturn,
  findTicketFailByEnrollmentIdReturn,
  getHotelsMock,
  getRoomsByHotelIdMock,
} from '../factories';
import hotelsService from '../../src/services/hotels-service';
import { notFoundError, unauthorizedError } from '@/errors';

import enrollmentRepository from '@/repositories/enrollment-repository';
import { cannotListHotelsError } from '@/errors/cannot-list-hotels-error';
import hotelRepository from '@/repositories/hotel-repository';
import ticketsRepository from '@/repositories/tickets-repository';

describe('listHotels function', () => {
  it('should return not found error', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(null);

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(notFoundError());
  });

  it('should return cannot list hotels error with ticket null', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(null);

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(unauthorizedError());
  });

  it('should return cannot list hotels error with ticket status reserved', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(unauthorizedError());
  });

  it('should return cannot list hotels error with ticket type is remote', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(unauthorizedError());
  });

  it('should return cannot list hotels error with ticket type not includes hotel', async () => {
    const userId = 1;

    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketFailByEnrollmentIdReturn());

    await expect(hotelsService.listHotels(userId)).rejects.toEqual(unauthorizedError());
  });
});

describe('getHotels function', () => {
  it('should get hotels', async () => {
    const userId = 1;
    const hotels = getHotelsMock();

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findHotels').mockResolvedValue(hotels);

    const result = await hotelsService.getHotels(userId);

    expect(result).toEqual(hotels);
  });
});

describe('getHotelsWithRooms function', () => {
  it('should get hotel with room', async () => {
    const userId = 1;
    const hotelId = 1;
    const hotel = getRoomsByHotelIdMock();
    const promise = [
      {
        id: hotel.id,
        available: 1,
        name: hotel.name,
        reserved: Number(),
      },
    ];

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(hotel);

    const result = await hotelsService.getHotelsWithRooms(userId, hotelId);

    expect(result).toEqual(promise);
  });

  it('should not found hotel with room', async () => {
    const userId = 1;
    const hotelId = 1;

    jest.spyOn(hotelsService, 'listHotels').mockResolvedValue(null);
    jest.spyOn(enrollmentRepository, 'findWithAddressByUserId').mockResolvedValue(enrollmentWithAddressReturn());
    jest.spyOn(ticketsRepository, 'findTicketByEnrollmentId').mockResolvedValue(findTicketByEnrollmentIdReturn());

    jest.spyOn(hotelRepository, 'findRoomsByHotelId').mockResolvedValue(null);

    await expect(hotelsService.getHotelsWithRooms(userId, hotelId)).rejects.toEqual(notFoundError());
  });
});
