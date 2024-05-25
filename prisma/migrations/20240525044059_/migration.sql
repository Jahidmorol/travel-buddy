/*
  Warnings:

  - You are about to drop the `userprofile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userprofile" DROP CONSTRAINT "userprofile_userId_fkey";

-- DropTable
DROP TABLE "userprofile";
