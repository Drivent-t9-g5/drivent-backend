-- CreateTable
CREATE TABLE "Subscription" (
    "id" SERIAL NOT NULL,
    "activitieId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_activitieId_fkey" FOREIGN KEY ("activitieId") REFERENCES "Activitie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
