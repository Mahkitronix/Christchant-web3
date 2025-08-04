/*
  Warnings:

  - The `status` column on the `Artist` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ArtistStatus" AS ENUM ('draft', 'pending', 'published', 'rejected');

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "nameSlug" SET DATA TYPE TEXT,
ALTER COLUMN "image" SET DATA TYPE TEXT,
ALTER COLUMN "website" SET DATA TYPE TEXT,
ALTER COLUMN "youtube" SET DATA TYPE TEXT,
ALTER COLUMN "youtubeMusic" SET DATA TYPE TEXT,
ALTER COLUMN "spotify" SET DATA TYPE TEXT,
ALTER COLUMN "appleMusic" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "ArtistStatus" NOT NULL DEFAULT 'pending',
ALTER COLUMN "createdAt" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updatedAt" SET DATA TYPE TIMESTAMP(3);
