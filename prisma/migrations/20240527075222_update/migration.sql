/*
  Warnings:

  - Added the required column `description` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tripType` to the `trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "trip" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "tripType" TEXT NOT NULL;
