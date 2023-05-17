import { prisma } from '@/config';

async function findHotels() {
  const hotels = await prisma.hotel.findMany({
    include: {
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          Booking: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  const formattedHotels = hotels.map((hotel) => {
    const types = { single: false, double: false, triple: false };
    let availableCount = 0;

    const formattedRooms = hotel.Rooms.map((room) => {
      const bookedCount = room.Booking?.length || 0;
      availableCount += room.capacity - bookedCount;

      if (room.capacity === 1) {
        types.single = true;
      } else if (room.capacity === 2) {
        types.double = true;
      } else if (room.capacity === 3) {
        types.triple = true;
      }
    });

    const typesNames = formatRoomTypes(types);

    return {
      id: hotel.id,
      name: hotel.name,
      image: hotel.image,
      disponible: availableCount,
      rooms: formattedRooms,
      types: typesNames,
    };
  });

  return formattedHotels;
}

async function findHotelById(hotelId: number) {
  const hotel = await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
  });
  return hotel;
}

function formatRoomTypes(types: any) {
  const typeNames = [];

  if (types.single) {
    typeNames.push('Single');
  }
  if (types.double) {
    typeNames.push('Double');
  }
  if (types.triple) {
    typeNames.push('Triple');
  }

  return typeNames.join(', ');
}

async function findRoomsByHotelId(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: {
        select: {
          id: true,
          name: true,
          capacity: true,
          Booking: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });
}

const hotelRepository = {
  findHotels,
  findHotelById,
  findRoomsByHotelId,
};

export default hotelRepository;
