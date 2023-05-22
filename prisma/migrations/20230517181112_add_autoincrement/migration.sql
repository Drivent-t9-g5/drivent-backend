-- AlterTable
CREATE SEQUENCE "activitie_id_seq";
ALTER TABLE "Activitie" ALTER COLUMN "id" SET DEFAULT nextval('activitie_id_seq');
ALTER SEQUENCE "activitie_id_seq" OWNED BY "Activitie"."id";

-- AlterTable
CREATE SEQUENCE "auditorium_id_seq";
ALTER TABLE "Auditorium" ALTER COLUMN "id" SET DEFAULT nextval('auditorium_id_seq');
ALTER SEQUENCE "auditorium_id_seq" OWNED BY "Auditorium"."id";
