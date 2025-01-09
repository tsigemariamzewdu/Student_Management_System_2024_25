/*
  Warnings:

  - Added the required column `semester` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('One', 'Two');

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "semester" "Semester" NOT NULL;
