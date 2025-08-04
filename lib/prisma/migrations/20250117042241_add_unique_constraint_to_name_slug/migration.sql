/*
  Warnings:

  - A unique constraint covering the columns `[nameSlug]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Artist_nameSlug_key" ON "Artist"("nameSlug");
