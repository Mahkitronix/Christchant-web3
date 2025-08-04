/*
  Warnings:

  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
ADD COLUMN     "emailVerifiedAt" TIMESTAMP(0),
ADD COLUMN     "isActivated" BOOLEAN NOT NULL DEFAULT true;

-- DropTable
DROP TABLE "Admin";
