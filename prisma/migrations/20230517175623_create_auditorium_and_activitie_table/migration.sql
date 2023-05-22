-- CreateTable
CREATE TABLE "Auditorium" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Auditorium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Activitie" (
    "id" INTEGER NOT NULL,
    "auditoriumId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Activitie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activitie" ADD CONSTRAINT "Activitie_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activitie" ADD CONSTRAINT "Activitie_auditoriumId_fkey" FOREIGN KEY ("auditoriumId") REFERENCES "Auditorium"("id") ON DELETE CASCADE ON UPDATE CASCADE;
